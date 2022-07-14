import { FindingType, FindingSeverity, Finding, HandleTransaction, createTransactionEvent } from "forta-agent";
import { formatBytes32String } from "ethers/lib/utils";
import { provideHandleTransaction } from "./agent";
import { FUNCTION_ABI } from "./constants";

const mockAccount1 = "0x6b51cb10119727a5e5ea3538074fb341f56b09cb";
const mockAccount2 = "0x9a1cb10119727a5e5ea3538074fb341f56b05ea";
const mockContractAddress = "0x7f51eb44623745a5e5ea3538074fb341f56b07ef";
const mockRole1 = formatBytes32String("abc");
const mockRole2 = formatBytes32String("def");
const mockRole3 = formatBytes32String("ghi");

describe("Monitor Access Control Role Changes", () => {
  let handleTransaction: HandleTransaction;
  const mockTxEvent = createTransactionEvent({} as any);

  beforeAll(() => {
    handleTransaction = provideHandleTransaction();
  });

  describe("handle transaction", () => {
    it("returns empty findings if no role changes detected", async () => {
      mockTxEvent.filterFunction = jest.fn().mockReturnValue([]);
      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([]);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledWith(FUNCTION_ABI);
    });

    it("returns a RoleGranted finding if grantRole or _setupRole function call is detected", async () => {
      const mockGrantRole = {
        name: "grantRole",
        args: { role: mockRole1, account: mockAccount1 },
        address: mockContractAddress,
      };
      mockTxEvent.filterFunction = jest.fn().mockReturnValue([mockGrantRole]);
      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: `Role Granted`,
          description: `Agent detected ${mockGrantRole.name} function call.`,
          alertId: "GRANT-ROLE",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            role: mockGrantRole.args.role,
            account: mockGrantRole.args.account,
          },
          addresses: [mockContractAddress],
        }),
      ]);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterFunction).toBeCalledWith(FUNCTION_ABI);
    });

    it("returns a RoleRevoked finding if revokeRole or renounceRole function call is detected", async () => {
      const mockRevokeRole = {
        name: "revokeRole",
        args: { role: mockRole1, account: mockAccount1 },
        address: mockContractAddress,
      };
      mockTxEvent.filterFunction = jest.fn().mockReturnValue([mockRevokeRole]);
      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: `Role Revoked`,
          description: `Agent detected ${mockRevokeRole.name} function call.`,
          alertId: "REVOKE-ROLE",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            role: mockRevokeRole.args.role,
            account: mockRevokeRole.args.account,
          },
          addresses: [mockContractAddress],
        }),
      ]);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterFunction).toBeCalledWith(FUNCTION_ABI);
    });

    it("returns a AdminRoleChanged finding if _setRoleAdmin function call is detected", async () => {
      const mockSetRoleAdmin = {
        name: "_setRoleAdmin",
        args: { role: mockRole1, previousAdminRole: mockRole2, newAdminRole: mockRole3 },
        address: mockContractAddress,
      };

      mockTxEvent.filterFunction = jest.fn().mockReturnValue([mockSetRoleAdmin]);
      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Admin Role Changed",
          description: `Agent detected ${mockSetRoleAdmin.name} function call`,
          alertId: "SET-ROLE-ADMIN",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            role: mockSetRoleAdmin.args.role,
            previousAdminRole: mockSetRoleAdmin.args.previousAdminRole,
            newAdminRole: mockSetRoleAdmin.args.newAdminRole,
          },
          addresses: [mockContractAddress],
        }),
      ]);
    });
  });
});
