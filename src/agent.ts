import { Finding, HandleTransaction, TransactionEvent, } from "forta-agent";
import { FUNCTION_ABI } from "./constants";
import { generateFinding } from "./utils";

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent): Promise<Finding[]> => {
  const findings: Finding[] = [];
  txEvent.filterFunction(FUNCTION_ABI).forEach((roleChangeCall) => {
    if (!roleChangeCall) {
      return findings
    } else{
      findings.push(
        generateFinding(
          roleChangeCall.name,
          roleChangeCall.args,
          roleChangeCall.address,
        )
      );
    }
  })
  return findings;
};
export default {
  handleTransaction
}
