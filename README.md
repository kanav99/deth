# deth

deth is a low-maintenence transaction hex to natural language decoder API. It lets solidity developers upload documentation+ABI to the API and extracts the dialogues out of them. When end users make an API request, it follows a three step process to decode the hex -

1. Checks if the transaction interacts with one of the contract ABIs uploaded by some solidity developer. If it does, it simply pulls the dialogue from the documentation.
2. If the first step fails, it tries to match transaction with common patterns like ERC20. If it matches, it generates the dialogue using corresponding dialgoue in a hardcoded map.
3. If both steps fail, it generates a generic dialogue specifying what function call to which contract. eg - "Method invocation `transfer(address _to,uint256 _value)` for contract `646f7e571a2d2ae709bcb9f7f12c6e47f235fd9c`"

## Usage

```bash
curl -X POST https://api.deth.kanavgupta.xyz/tx -H 'Content-Type: application/json' --data '{ "hex": "<put transaction hex here>" }' | json_pp
```

Checkout demo at [https://deth.kanavgupta.xyz](https://deth.kanavgupta.xyz)

## Add your contract ABI to the API

To make your smart contract compatible with our API, just add `@notice` annotation for each of your method you want to expose. The annotation can make use of our convinient macros -

1. @tokenSymbol(addr) - gets the symbol of deployed ERC20 contract at addr
2. @to() - the current contract address
3. @sender() - the sender address
4. @tokenSupply(addr) - gets total supply of ERC20 token
5. @tokenDecimal(addr) - get number of decimal of ERC20 token

For example -

```solidity
// example.sol
contract Exchange {
    /// @notice Exchanges `q1` `@tokenSymbol(t1)` for `q2` `@tokenSymbol(t2)`
    function exchange(uint256 q1, address t1, uint256 q2, address t2) external {
        // code ...
    }
}
```

generates "Exchanges 1 WEENUS for 2 XEENUS" as an example.

Now generate ABI and Documentation using -

```bash
solc --userdoc --abi example.sol
```

No need to redeploy your contract. Upload the two JSON dumped along with the deployed address on [https://deth.kanavgupta.xyz/#/admin](https://deth.kanavgupta.xyz/#/admin) and it will be added to deth API.

Now if anyone tries to decode a transaction related to this method call, deth will decode it accurately.
