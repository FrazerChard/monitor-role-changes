export const FUNCTION_ABI = [
  //If `account` had not been already granted `role`, emits a {RoleGranted} event.
  "function grantRole(bytes32 role, address account)",
  //the caller must have ``role``'s admin role.
  "function revokeRole(bytes32 role, address account)",
  //provides a mechanism for accounts to lose their privileges if they are compromised
  "function renounceRole(bytes32 role, address account)",
  // should only be called from  constructor when settingup initial roles for the system.
  "function _setupRole(bytes32 role, address account)",
  //Sets `adminRole` as ``role``'s admin role.
  "function _setRoleAdmin(bytes32 role, bytes32 adminRole)",
];
