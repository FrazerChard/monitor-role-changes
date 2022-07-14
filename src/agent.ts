import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { FUNCTION_ABI } from "./constants";
import { generateFinding } from "./utils";

export function provideHandleTransaction(): HandleTransaction {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];
    txEvent.filterFunction(FUNCTION_ABI).forEach((roleChangeCall) => {
      findings.push(generateFinding(roleChangeCall.name, roleChangeCall.args, roleChangeCall.address));
    });
    return findings;
  };
}
export default {
  handleTransaction: provideHandleTransaction(),
};
