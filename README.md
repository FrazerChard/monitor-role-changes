# Access Control Role Change Agent

## Description

This agent detects access control role changes

## Supported Chains

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

- GRANT-ROLE
  - Fired when agent detects roleGranted or _setupRole function
  - Severity is always set to "info"
  - Type is always set to "info" 
  - Metadata: {
      role,
      account,
      contract address
    }

- REVOKE-ROLE
  - Fired when agent detects roleRevoked or roleRenounced function
  - Severity is always set to "info"
  - Type is always set to "info" 
  - Metadata: {
      role,
      account,
      contract address
    }

- SET-ROLE-ADMIN
  - Fired when agent detects setRoleAdmin function
  - Severity is always set to "info"
  - Type is always set to "info" 
  - Metadata: {
      role,
      previousAdminRole,
      newAdminRole,
      contract address
    }
  

## Test Data

The agent behaviour can be verified with the following transactions:
- tx: 0xd0609f2a45bc00da0de1e5f47c2e7a625ad25ca50011ecf143706cfc16e0b5ee

  RoleGranted call {
  
    role: 0xb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e
    
    account: 0x64c7d40c07EFAbec2AafdC243bF59eaF2195c6dc
    
    contract address: 0x5aa653a076c1dbb47cec8c1b4d152444cad91941
        
  }

- tx: 0x3daa0df0d4934ee9d248f1c7aad5f1aae847fc4fae7260362baddf50c86f0645

  RoleRevoked call {
  
    role: 0xb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e
    
    account: 0x301DF37d653b281AF83a1DDf4464eF21A622eC83
    
    contract address: 0x65f7ba4ec257af7c55fd5854e5f6356bbd0fb8ec
    
  }
}
