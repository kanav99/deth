const patterns = [
  {
    name: 'erc20',
    abi: [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        type: 'function',
        dialogue: 'Fetch the name of the ERC20 token deployed at `@to()`',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_spender',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            name: 'success',
            type: 'bool',
          },
        ],
        payable: false,
        type: 'function',
        dialogue: 'Approve `_value` `@tokenSymbol(@to())` to `_spender`',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        type: 'function',
        dialogue:
          'Fetch the total supply of the ERC20 token deployed at `@to()`',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_from',
            type: 'address',
          },
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            name: 'success',
            type: 'bool',
          },
        ],
        payable: false,
        type: 'function',
        dialogue:
          'Transfer `_value` `@tokenSymbol(@to())` from `_from` to `_to`',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        type: 'function',
        dialogue:
          'Fetch the number of decimals of the ERC20 token deployed at `@to()`',
      },
      {
        constant: true,
        inputs: [],
        name: 'version',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        type: 'function',
        dialogue: 'Fetch the version of the ERC20 token deployed at `@to()`',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: 'balance',
            type: 'uint256',
          },
        ],
        payable: false,
        type: 'function',
        dialogue: 'Fetch the balance of `_owner`',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        type: 'function',
        dialogue: 'Fetch the symbol of the ERC20 token deployed at `@to()`',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            name: 'success',
            type: 'bool',
          },
        ],
        payable: false,
        type: 'function',
        dialogue: 'Transfer `_value` `@tokenSymbol(@to())` to `_to`',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_spender',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
          {
            name: '_extraData',
            type: 'bytes',
          },
        ],
        name: 'approveAndCall',
        outputs: [
          {
            name: 'success',
            type: 'bool',
          },
        ],
        payable: false,
        type: 'function',
        dialogue:
          'Approve `_value` `@tokenSymbol(@to())` to `_spender` and execute custom code in _extraData',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
          {
            name: '_spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            name: 'remaining',
            type: 'uint256',
          },
        ],
        payable: false,
        type: 'function',
        dialogue: 'Fetch the remaining allowance of `_spender` for `_owner`',
      },
    ],
  },
];

export default patterns;
