import { Finding, FindingSeverity, FindingType } from "forta-agent";

export const generateFinding = (name: string, args: any, contractAddress: string): Finding => {
  switch (name) {
    case "grantRole" || "_setupRole":
      return Finding.fromObject({
        name: `Role Granted`,
        description: `Agent detected ${name} function call.`,
        alertId: "GRANT-ROLE",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          role: args.role,
          account: args.account,
        },
        addresses: [contractAddress],
      });
    case "revokeRole" || "renounceRole":
      return Finding.fromObject({
        name: `Role Revoked`,
        description: `Agent detected ${name} function call.`,
        alertId: "REVOKE-ROLE",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          role: args.role,
          account: args.account,
        },
        addresses: [contractAddress],
      });
    default:
      return Finding.fromObject({
        name: "Admin Role Changed",
        description: `Agent detected ${name} function call`, //name = _setRoleAdmin
        alertId: "SET-ROLE-ADMIN",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          role: args.role,
          previousAdminRole: args.previousAdminRole,
          newAdminRole: args.newAdminRole,
        },
        addresses: [contractAddress],
      });
  }
};
