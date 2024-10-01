export const orderBookJson = {
	abi: [
		{
			type: 'function',
			name: 'addOrder2',
			inputs: [
				{
					name: 'orderConfig',
					type: 'tuple',
					internalType: 'struct OrderConfigV3',
					components: [
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'validInputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{
							name: 'validOutputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' },
						{ name: 'secret', type: 'bytes32', internalType: 'bytes32' },
						{ name: 'meta', type: 'bytes', internalType: 'bytes' }
					]
				},
				{
					name: 'post',
					type: 'tuple[]',
					internalType: 'struct ActionV1[]',
					components: [
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'signedContext',
							type: 'tuple[]',
							internalType: 'struct SignedContextV1[]',
							components: [
								{ name: 'signer', type: 'address', internalType: 'address' },
								{
									name: 'context',
									type: 'uint256[]',
									internalType: 'uint256[]'
								},
								{ name: 'signature', type: 'bytes', internalType: 'bytes' }
							]
						}
					]
				}
			],
			outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
			stateMutability: 'nonpayable'
		},
		{
			type: 'function',
			name: 'clear2',
			inputs: [
				{
					name: 'aliceOrder',
					type: 'tuple',
					internalType: 'struct OrderV3',
					components: [
						{ name: 'owner', type: 'address', internalType: 'address' },
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'validInputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{
							name: 'validOutputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
					]
				},
				{
					name: 'bobOrder',
					type: 'tuple',
					internalType: 'struct OrderV3',
					components: [
						{ name: 'owner', type: 'address', internalType: 'address' },
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'validInputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{
							name: 'validOutputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
					]
				},
				{
					name: 'clearConfig',
					type: 'tuple',
					internalType: 'struct ClearConfig',
					components: [
						{
							name: 'aliceInputIOIndex',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'aliceOutputIOIndex',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'bobInputIOIndex',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'bobOutputIOIndex',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'aliceBountyVaultId',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'bobBountyVaultId',
							type: 'uint256',
							internalType: 'uint256'
						}
					]
				},
				{
					name: 'aliceSignedContext',
					type: 'tuple[]',
					internalType: 'struct SignedContextV1[]',
					components: [
						{ name: 'signer', type: 'address', internalType: 'address' },
						{ name: 'context', type: 'uint256[]', internalType: 'uint256[]' },
						{ name: 'signature', type: 'bytes', internalType: 'bytes' }
					]
				},
				{
					name: 'bobSignedContext',
					type: 'tuple[]',
					internalType: 'struct SignedContextV1[]',
					components: [
						{ name: 'signer', type: 'address', internalType: 'address' },
						{ name: 'context', type: 'uint256[]', internalType: 'uint256[]' },
						{ name: 'signature', type: 'bytes', internalType: 'bytes' }
					]
				}
			],
			outputs: [],
			stateMutability: 'nonpayable'
		},
		{
			type: 'function',
			name: 'deposit2',
			inputs: [
				{ name: 'token', type: 'address', internalType: 'address' },
				{ name: 'vaultId', type: 'uint256', internalType: 'uint256' },
				{ name: 'amount', type: 'uint256', internalType: 'uint256' },
				{
					name: 'post',
					type: 'tuple[]',
					internalType: 'struct ActionV1[]',
					components: [
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'signedContext',
							type: 'tuple[]',
							internalType: 'struct SignedContextV1[]',
							components: [
								{ name: 'signer', type: 'address', internalType: 'address' },
								{
									name: 'context',
									type: 'uint256[]',
									internalType: 'uint256[]'
								},
								{ name: 'signature', type: 'bytes', internalType: 'bytes' }
							]
						}
					]
				}
			],
			outputs: [],
			stateMutability: 'nonpayable'
		},
		{
			type: 'function',
			name: 'enact',
			inputs: [
				{
					name: 'post',
					type: 'tuple[]',
					internalType: 'struct ActionV1[]',
					components: [
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'signedContext',
							type: 'tuple[]',
							internalType: 'struct SignedContextV1[]',
							components: [
								{ name: 'signer', type: 'address', internalType: 'address' },
								{
									name: 'context',
									type: 'uint256[]',
									internalType: 'uint256[]'
								},
								{ name: 'signature', type: 'bytes', internalType: 'bytes' }
							]
						}
					]
				}
			],
			outputs: [],
			stateMutability: 'nonpayable'
		},
		{
			type: 'function',
			name: 'flashFee',
			inputs: [
				{ name: '', type: 'address', internalType: 'address' },
				{ name: '', type: 'uint256', internalType: 'uint256' }
			],
			outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
			stateMutability: 'pure'
		},
		{
			type: 'function',
			name: 'flashLoan',
			inputs: [
				{
					name: 'receiver',
					type: 'address',
					internalType: 'contract IERC3156FlashBorrower'
				},
				{ name: 'token', type: 'address', internalType: 'address' },
				{ name: 'amount', type: 'uint256', internalType: 'uint256' },
				{ name: 'data', type: 'bytes', internalType: 'bytes' }
			],
			outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
			stateMutability: 'nonpayable'
		},
		{
			type: 'function',
			name: 'maxFlashLoan',
			inputs: [{ name: 'token', type: 'address', internalType: 'address' }],
			outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
			stateMutability: 'view'
		},
		{
			type: 'function',
			name: 'multicall',
			inputs: [{ name: 'data', type: 'bytes[]', internalType: 'bytes[]' }],
			outputs: [{ name: 'results', type: 'bytes[]', internalType: 'bytes[]' }],
			stateMutability: 'nonpayable'
		},
		{
			type: 'function',
			name: 'orderExists',
			inputs: [{ name: 'orderHash', type: 'bytes32', internalType: 'bytes32' }],
			outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
			stateMutability: 'view'
		},
		{
			type: 'function',
			name: 'quote',
			inputs: [
				{
					name: 'quoteConfig',
					type: 'tuple',
					internalType: 'struct Quote',
					components: [
						{
							name: 'order',
							type: 'tuple',
							internalType: 'struct OrderV3',
							components: [
								{ name: 'owner', type: 'address', internalType: 'address' },
								{
									name: 'evaluable',
									type: 'tuple',
									internalType: 'struct EvaluableV3',
									components: [
										{
											name: 'interpreter',
											type: 'address',
											internalType: 'contract IInterpreterV3'
										},
										{
											name: 'store',
											type: 'address',
											internalType: 'contract IInterpreterStoreV2'
										},
										{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
									]
								},
								{
									name: 'validInputs',
									type: 'tuple[]',
									internalType: 'struct IO[]',
									components: [
										{ name: 'token', type: 'address', internalType: 'address' },
										{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
										{
											name: 'vaultId',
											type: 'uint256',
											internalType: 'uint256'
										}
									]
								},
								{
									name: 'validOutputs',
									type: 'tuple[]',
									internalType: 'struct IO[]',
									components: [
										{ name: 'token', type: 'address', internalType: 'address' },
										{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
										{
											name: 'vaultId',
											type: 'uint256',
											internalType: 'uint256'
										}
									]
								},
								{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
							]
						},
						{ name: 'inputIOIndex', type: 'uint256', internalType: 'uint256' },
						{ name: 'outputIOIndex', type: 'uint256', internalType: 'uint256' },
						{
							name: 'signedContext',
							type: 'tuple[]',
							internalType: 'struct SignedContextV1[]',
							components: [
								{ name: 'signer', type: 'address', internalType: 'address' },
								{
									name: 'context',
									type: 'uint256[]',
									internalType: 'uint256[]'
								},
								{ name: 'signature', type: 'bytes', internalType: 'bytes' }
							]
						}
					]
				}
			],
			outputs: [
				{ name: '', type: 'bool', internalType: 'bool' },
				{ name: '', type: 'uint256', internalType: 'uint256' },
				{ name: '', type: 'uint256', internalType: 'uint256' }
			],
			stateMutability: 'view'
		},
		{
			type: 'function',
			name: 'removeOrder2',
			inputs: [
				{
					name: 'order',
					type: 'tuple',
					internalType: 'struct OrderV3',
					components: [
						{ name: 'owner', type: 'address', internalType: 'address' },
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'validInputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{
							name: 'validOutputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
					]
				},
				{
					name: 'post',
					type: 'tuple[]',
					internalType: 'struct ActionV1[]',
					components: [
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'signedContext',
							type: 'tuple[]',
							internalType: 'struct SignedContextV1[]',
							components: [
								{ name: 'signer', type: 'address', internalType: 'address' },
								{
									name: 'context',
									type: 'uint256[]',
									internalType: 'uint256[]'
								},
								{ name: 'signature', type: 'bytes', internalType: 'bytes' }
							]
						}
					]
				}
			],
			outputs: [{ name: 'stateChanged', type: 'bool', internalType: 'bool' }],
			stateMutability: 'nonpayable'
		},
		{
			type: 'function',
			name: 'supportsInterface',
			inputs: [{ name: 'interfaceId', type: 'bytes4', internalType: 'bytes4' }],
			outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
			stateMutability: 'view'
		},
		{
			type: 'function',
			name: 'takeOrders2',
			inputs: [
				{
					name: 'config',
					type: 'tuple',
					internalType: 'struct TakeOrdersConfigV3',
					components: [
						{ name: 'minimumInput', type: 'uint256', internalType: 'uint256' },
						{ name: 'maximumInput', type: 'uint256', internalType: 'uint256' },
						{
							name: 'maximumIORatio',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'orders',
							type: 'tuple[]',
							internalType: 'struct TakeOrderConfigV3[]',
							components: [
								{
									name: 'order',
									type: 'tuple',
									internalType: 'struct OrderV3',
									components: [
										{ name: 'owner', type: 'address', internalType: 'address' },
										{
											name: 'evaluable',
											type: 'tuple',
											internalType: 'struct EvaluableV3',
											components: [
												{
													name: 'interpreter',
													type: 'address',
													internalType: 'contract IInterpreterV3'
												},
												{
													name: 'store',
													type: 'address',
													internalType: 'contract IInterpreterStoreV2'
												},
												{
													name: 'bytecode',
													type: 'bytes',
													internalType: 'bytes'
												}
											]
										},
										{
											name: 'validInputs',
											type: 'tuple[]',
											internalType: 'struct IO[]',
											components: [
												{
													name: 'token',
													type: 'address',
													internalType: 'address'
												},
												{
													name: 'decimals',
													type: 'uint8',
													internalType: 'uint8'
												},
												{
													name: 'vaultId',
													type: 'uint256',
													internalType: 'uint256'
												}
											]
										},
										{
											name: 'validOutputs',
											type: 'tuple[]',
											internalType: 'struct IO[]',
											components: [
												{
													name: 'token',
													type: 'address',
													internalType: 'address'
												},
												{
													name: 'decimals',
													type: 'uint8',
													internalType: 'uint8'
												},
												{
													name: 'vaultId',
													type: 'uint256',
													internalType: 'uint256'
												}
											]
										},
										{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
									]
								},
								{
									name: 'inputIOIndex',
									type: 'uint256',
									internalType: 'uint256'
								},
								{
									name: 'outputIOIndex',
									type: 'uint256',
									internalType: 'uint256'
								},
								{
									name: 'signedContext',
									type: 'tuple[]',
									internalType: 'struct SignedContextV1[]',
									components: [
										{
											name: 'signer',
											type: 'address',
											internalType: 'address'
										},
										{
											name: 'context',
											type: 'uint256[]',
											internalType: 'uint256[]'
										},
										{ name: 'signature', type: 'bytes', internalType: 'bytes' }
									]
								}
							]
						},
						{ name: 'data', type: 'bytes', internalType: 'bytes' }
					]
				}
			],
			outputs: [
				{ name: 'totalTakerInput', type: 'uint256', internalType: 'uint256' },
				{ name: 'totalTakerOutput', type: 'uint256', internalType: 'uint256' }
			],
			stateMutability: 'nonpayable'
		},
		{
			type: 'function',
			name: 'vaultBalance',
			inputs: [
				{ name: 'owner', type: 'address', internalType: 'address' },
				{ name: 'token', type: 'address', internalType: 'address' },
				{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
			],
			outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
			stateMutability: 'view'
		},
		{
			type: 'function',
			name: 'withdraw2',
			inputs: [
				{ name: 'token', type: 'address', internalType: 'address' },
				{ name: 'vaultId', type: 'uint256', internalType: 'uint256' },
				{ name: 'targetAmount', type: 'uint256', internalType: 'uint256' },
				{
					name: 'post',
					type: 'tuple[]',
					internalType: 'struct ActionV1[]',
					components: [
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'signedContext',
							type: 'tuple[]',
							internalType: 'struct SignedContextV1[]',
							components: [
								{ name: 'signer', type: 'address', internalType: 'address' },
								{
									name: 'context',
									type: 'uint256[]',
									internalType: 'uint256[]'
								},
								{ name: 'signature', type: 'bytes', internalType: 'bytes' }
							]
						}
					]
				}
			],
			outputs: [],
			stateMutability: 'nonpayable'
		},
		{
			type: 'event',
			name: 'AddOrderV2',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'orderHash',
					type: 'bytes32',
					indexed: false,
					internalType: 'bytes32'
				},
				{
					name: 'order',
					type: 'tuple',
					indexed: false,
					internalType: 'struct OrderV3',
					components: [
						{ name: 'owner', type: 'address', internalType: 'address' },
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'validInputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{
							name: 'validOutputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
					]
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'AfterClear',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'clearStateChange',
					type: 'tuple',
					indexed: false,
					internalType: 'struct ClearStateChange',
					components: [
						{ name: 'aliceOutput', type: 'uint256', internalType: 'uint256' },
						{ name: 'bobOutput', type: 'uint256', internalType: 'uint256' },
						{ name: 'aliceInput', type: 'uint256', internalType: 'uint256' },
						{ name: 'bobInput', type: 'uint256', internalType: 'uint256' }
					]
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'ClearV2',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'alice',
					type: 'tuple',
					indexed: false,
					internalType: 'struct OrderV3',
					components: [
						{ name: 'owner', type: 'address', internalType: 'address' },
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'validInputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{
							name: 'validOutputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
					]
				},
				{
					name: 'bob',
					type: 'tuple',
					indexed: false,
					internalType: 'struct OrderV3',
					components: [
						{ name: 'owner', type: 'address', internalType: 'address' },
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'validInputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{
							name: 'validOutputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
					]
				},
				{
					name: 'clearConfig',
					type: 'tuple',
					indexed: false,
					internalType: 'struct ClearConfig',
					components: [
						{
							name: 'aliceInputIOIndex',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'aliceOutputIOIndex',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'bobInputIOIndex',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'bobOutputIOIndex',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'aliceBountyVaultId',
							type: 'uint256',
							internalType: 'uint256'
						},
						{
							name: 'bobBountyVaultId',
							type: 'uint256',
							internalType: 'uint256'
						}
					]
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'Context',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'context',
					type: 'uint256[][]',
					indexed: false,
					internalType: 'uint256[][]'
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'Deposit',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'token',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'vaultId',
					type: 'uint256',
					indexed: false,
					internalType: 'uint256'
				},
				{
					name: 'amount',
					type: 'uint256',
					indexed: false,
					internalType: 'uint256'
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'MetaV1_2',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'subject',
					type: 'bytes32',
					indexed: false,
					internalType: 'bytes32'
				},
				{ name: 'meta', type: 'bytes', indexed: false, internalType: 'bytes' }
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'OrderExceedsMaxRatio',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'owner',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'orderHash',
					type: 'bytes32',
					indexed: false,
					internalType: 'bytes32'
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'OrderNotFound',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'owner',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'orderHash',
					type: 'bytes32',
					indexed: false,
					internalType: 'bytes32'
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'OrderZeroAmount',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'owner',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'orderHash',
					type: 'bytes32',
					indexed: false,
					internalType: 'bytes32'
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'RemoveOrderV2',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'orderHash',
					type: 'bytes32',
					indexed: false,
					internalType: 'bytes32'
				},
				{
					name: 'order',
					type: 'tuple',
					indexed: false,
					internalType: 'struct OrderV3',
					components: [
						{ name: 'owner', type: 'address', internalType: 'address' },
						{
							name: 'evaluable',
							type: 'tuple',
							internalType: 'struct EvaluableV3',
							components: [
								{
									name: 'interpreter',
									type: 'address',
									internalType: 'contract IInterpreterV3'
								},
								{
									name: 'store',
									type: 'address',
									internalType: 'contract IInterpreterStoreV2'
								},
								{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
							]
						},
						{
							name: 'validInputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{
							name: 'validOutputs',
							type: 'tuple[]',
							internalType: 'struct IO[]',
							components: [
								{ name: 'token', type: 'address', internalType: 'address' },
								{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
								{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
							]
						},
						{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
					]
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'TakeOrderV2',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'config',
					type: 'tuple',
					indexed: false,
					internalType: 'struct TakeOrderConfigV3',
					components: [
						{
							name: 'order',
							type: 'tuple',
							internalType: 'struct OrderV3',
							components: [
								{ name: 'owner', type: 'address', internalType: 'address' },
								{
									name: 'evaluable',
									type: 'tuple',
									internalType: 'struct EvaluableV3',
									components: [
										{
											name: 'interpreter',
											type: 'address',
											internalType: 'contract IInterpreterV3'
										},
										{
											name: 'store',
											type: 'address',
											internalType: 'contract IInterpreterStoreV2'
										},
										{ name: 'bytecode', type: 'bytes', internalType: 'bytes' }
									]
								},
								{
									name: 'validInputs',
									type: 'tuple[]',
									internalType: 'struct IO[]',
									components: [
										{ name: 'token', type: 'address', internalType: 'address' },
										{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
										{
											name: 'vaultId',
											type: 'uint256',
											internalType: 'uint256'
										}
									]
								},
								{
									name: 'validOutputs',
									type: 'tuple[]',
									internalType: 'struct IO[]',
									components: [
										{ name: 'token', type: 'address', internalType: 'address' },
										{ name: 'decimals', type: 'uint8', internalType: 'uint8' },
										{
											name: 'vaultId',
											type: 'uint256',
											internalType: 'uint256'
										}
									]
								},
								{ name: 'nonce', type: 'bytes32', internalType: 'bytes32' }
							]
						},
						{ name: 'inputIOIndex', type: 'uint256', internalType: 'uint256' },
						{ name: 'outputIOIndex', type: 'uint256', internalType: 'uint256' },
						{
							name: 'signedContext',
							type: 'tuple[]',
							internalType: 'struct SignedContextV1[]',
							components: [
								{ name: 'signer', type: 'address', internalType: 'address' },
								{
									name: 'context',
									type: 'uint256[]',
									internalType: 'uint256[]'
								},
								{ name: 'signature', type: 'bytes', internalType: 'bytes' }
							]
						}
					]
				},
				{
					name: 'input',
					type: 'uint256',
					indexed: false,
					internalType: 'uint256'
				},
				{
					name: 'output',
					type: 'uint256',
					indexed: false,
					internalType: 'uint256'
				}
			],
			anonymous: false
		},
		{
			type: 'event',
			name: 'Withdraw',
			inputs: [
				{
					name: 'sender',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'token',
					type: 'address',
					indexed: false,
					internalType: 'address'
				},
				{
					name: 'vaultId',
					type: 'uint256',
					indexed: false,
					internalType: 'uint256'
				},
				{
					name: 'targetAmount',
					type: 'uint256',
					indexed: false,
					internalType: 'uint256'
				},
				{
					name: 'amount',
					type: 'uint256',
					indexed: false,
					internalType: 'uint256'
				}
			],
			anonymous: false
		},
		{
			type: 'error',
			name: 'FlashLenderCallbackFailed',
			inputs: [{ name: 'result', type: 'bytes32', internalType: 'bytes32' }]
		},
		{
			type: 'error',
			name: 'InvalidSignature',
			inputs: [{ name: 'i', type: 'uint256', internalType: 'uint256' }]
		},
		{
			type: 'error',
			name: 'MinimumInput',
			inputs: [
				{ name: 'minimumInput', type: 'uint256', internalType: 'uint256' },
				{ name: 'input', type: 'uint256', internalType: 'uint256' }
			]
		},
		{ type: 'error', name: 'NoOrders', inputs: [] },
		{
			type: 'error',
			name: 'NotOrderOwner',
			inputs: [
				{ name: 'sender', type: 'address', internalType: 'address' },
				{ name: 'owner', type: 'address', internalType: 'address' }
			]
		},
		{
			type: 'error',
			name: 'NotRainMetaV1',
			inputs: [{ name: 'unmeta', type: 'bytes', internalType: 'bytes' }]
		},
		{ type: 'error', name: 'OrderNoHandleIO', inputs: [] },
		{ type: 'error', name: 'OrderNoInputs', inputs: [] },
		{ type: 'error', name: 'OrderNoOutputs', inputs: [] },
		{ type: 'error', name: 'OrderNoSources', inputs: [] },
		{
			type: 'error',
			name: 'SameOwner',
			inputs: [{ name: 'owner', type: 'address', internalType: 'address' }]
		},
		{
			type: 'error',
			name: 'TokenDecimalsMismatch',
			inputs: [
				{ name: 'aliceTokenDecimals', type: 'uint8', internalType: 'uint8' },
				{ name: 'bobTokenDecimals', type: 'uint8', internalType: 'uint8' }
			]
		},
		{
			type: 'error',
			name: 'TokenMismatch',
			inputs: [
				{ name: 'aliceToken', type: 'address', internalType: 'address' },
				{ name: 'bobToken', type: 'address', internalType: 'address' }
			]
		},
		{
			type: 'error',
			name: 'UnsupportedCalculateOutputs',
			inputs: [{ name: 'outputs', type: 'uint256', internalType: 'uint256' }]
		},
		{
			type: 'error',
			name: 'ZeroDepositAmount',
			inputs: [
				{ name: 'sender', type: 'address', internalType: 'address' },
				{ name: 'token', type: 'address', internalType: 'address' },
				{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
			]
		},
		{ type: 'error', name: 'ZeroMaximumInput', inputs: [] },
		{
			type: 'error',
			name: 'ZeroWithdrawTargetAmount',
			inputs: [
				{ name: 'sender', type: 'address', internalType: 'address' },
				{ name: 'token', type: 'address', internalType: 'address' },
				{ name: 'vaultId', type: 'uint256', internalType: 'uint256' }
			]
		}
	],
	bytecode: {
		object:
			'0x6080604052348015600e575f80fd5b5060015f55615c81806100205f395ff3fe608060405234801561000f575f80fd5b50600436106100f0575f3560e01c8063a08f5dff11610093578063d97b2e4811610063578063d97b2e481461021c578063d9d98ce414610268578063e0e530b71461027d578063f513c42d146102ad575f80fd5b8063a08f5dff146101c3578063a616864d146101d6578063ac9650d8146101e9578063c1e4c4af14610209575f80fd5b80635cffe9de116100ce5780635cffe9de14610167578063613255ab1461017a5780638d7b6beb1461019b57806391337c0a146101ae575f80fd5b806301ffc9a7146100f45780630997c4a01461011c5780632cb77e9f14610144575b5f80fd5b6101076101023660046143ce565b6102c0565b60405190151581526020015b60405180910390f35b61012f61012a366004614423565b610358565b60408051928352602083019190915201610113565b610107610152366004614455565b5f908152600160208190526040909120541490565b61010761017536600461449d565b611221565b61018d610188366004614534565b61137a565b604051908152602001610113565b6101076101a9366004614590565b611408565b6101c16101bc3660046145f4565b6115a4565b005b6101c16101d1366004614b28565b611729565b6101076101e4366004614be2565b611e45565b6101fc6101f7366004614c17565b612138565b6040516101139190614ca2565b6101c1610217366004614c17565b61221e565b61018d61022a366004614d22565b73ffffffffffffffffffffffffffffffffffffffff9283165f9081526002602090815260408083209490951682529283528381209181529152205490565b61018d610276366004614d60565b5f92915050565b61029061028b366004614d8a565b61223c565b604080519315158452602084019290925290820152606001610113565b6101c16102bb3660046145f4565b6122d9565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082167fe414309100000000000000000000000000000000000000000000000000000000148061035257507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b5f80610362612450565b61036f6060840184614dc1565b90505f036103a9576040517f9c95219f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103b16142d5565b6103b9614301565b60605f6103c887830188614dc1565b6040805160206001939093018302810190915293508801359150505f81900361041d576040517fc2ee700900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5b61042c6060890189614dc1565b90508110801561043b57505f82115b15610e3b5761044d6060890189614dc1565b8281811061045d5761045d614e25565b905060200281019061046f9190614e52565b61047890614e8e565b8051909550935061048c6060890189614dc1565b5f81811061049c5761049c614e25565b90506020028101906104ae9190614e52565b6104b89080614f24565b6104c6906040810190614f56565b6104d360608b018b614dc1565b5f8181106104e3576104e3614e25565b90506020028101906104f59190614e52565b6020013581811061050857610508614e25565b61051e9260206060909202019081019150614534565b73ffffffffffffffffffffffffffffffffffffffff16846040015186602001518151811061054e5761054e614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff161461069057836040015185602001518151811061058e5761058e614e25565b6020908102919091010151516105a760608a018a614dc1565b5f8181106105b7576105b7614e25565b90506020028101906105c99190614e52565b6105d39080614f24565b6105e1906040810190614f56565b6105ee60608c018c614dc1565b5f8181106105fe576105fe614e25565b90506020028101906106109190614e52565b6020013581811061062357610623614e25565b6106399260206060909202019081019150614534565b6040517ff902523f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9283166004820152911660248201526044015b60405180910390fd5b61069d6060890189614dc1565b5f8181106106ad576106ad614e25565b90506020028101906106bf9190614e52565b6106c99080614f24565b6106d7906060810190614f56565b6106e460608b018b614dc1565b5f8181106106f4576106f4614e25565b90506020028101906107069190614e52565b6040013581811061071957610719614e25565b61072f9260206060909202019081019150614534565b73ffffffffffffffffffffffffffffffffffffffff16846060015186604001518151811061075f5761075f614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff161461083457836060015185604001518151811061079f5761079f614e25565b6020908102919091010151516107b860608a018a614dc1565b5f8181106107c8576107c8614e25565b90506020028101906107da9190614e52565b6107e49080614f24565b6107f2906060810190614f56565b6107ff60608c018c614dc1565b5f81811061080f5761080f614e25565b90506020028101906108219190614e52565b6040013581811061062357610623614e25565b6108416060890189614dc1565b5f81811061085157610851614e25565b90506020028101906108639190614e52565b61086d9080614f24565b61087b906040810190614f56565b61088860608b018b614dc1565b5f81811061089857610898614e25565b90506020028101906108aa9190614e52565b602001358181106108bd576108bd614e25565b90506060020160200160208101906108d59190614fb9565b60ff1684604001518660200151815181106108f2576108f2614e25565b60200260200101516020015160ff1614610a0f57836040015185602001518151811061092057610920614e25565b60200260200101516020015188806060019061093c9190614dc1565b5f81811061094c5761094c614e25565b905060200281019061095e9190614e52565b6109689080614f24565b610976906040810190614f56565b61098360608c018c614dc1565b5f81811061099357610993614e25565b90506020028101906109a59190614e52565b602001358181106109b8576109b8614e25565b90506060020160200160208101906109d09190614fb9565b6040517f0f6ce47700000000000000000000000000000000000000000000000000000000815260ff928316600482015291166024820152604401610687565b610a1c6060890189614dc1565b5f818110610a2c57610a2c614e25565b9050602002810190610a3e9190614e52565b610a489080614f24565b610a56906060810190614f56565b610a6360608b018b614dc1565b5f818110610a7357610a73614e25565b9050602002810190610a859190614e52565b60400135818110610a9857610a98614e25565b9050606002016020016020810190610ab09190614fb9565b60ff168460600151866040015181518110610acd57610acd614e25565b60200260200101516020015160ff1614610b93578360600151856040015181518110610afb57610afb614e25565b602002602001015160200151888060600190610b179190614dc1565b5f818110610b2757610b27614e25565b9050602002810190610b399190614e52565b610b439080614f24565b610b51906060810190614f56565b610b5e60608c018c614dc1565b5f818110610b6e57610b6e614e25565b9050602002810190610b809190614e52565b604001358181106109b8576109b8614e25565b5f610b9d856124c1565b5f81815260016020526040902054909150610c0f5784516040805133815273ffffffffffffffffffffffffffffffffffffffff909216602083015281018290527fb70c12fa453793fa6818ec07c91e74363a47aa6a6829dcd9533937fdf30314f39060600160405180910390a1610e32565b5f610c298688602001518960400151338b606001516124f0565b9050896040013581606001511115610c995785516040805133815273ffffffffffffffffffffffffffffffffffffffff909216602083015281018390527fe3151dc8cb7a54ffc4baabd28c1f241c94d510b5e5b502491ac3cad6c16316d5906060015b60405180910390a1610e30565b80604001515f03610cf95785516040805133815273ffffffffffffffffffffffffffffffffffffffff909216602083015281018390527f500b713857325f9e6dcb52ae832eca9109d107ed1aae9cb4928b4c1e13f051aa90606001610c8c565b5f8660600151886040015181518110610d1457610d14614e25565b602090810291909101810151015160408301519091505f610d3a8760ff85166002612bba565b905080821115610d48578091505b505f80610d658560600151600185612c3e9092919063ffffffff16565b9050610da58a604001518c6020015181518110610d8457610d84614e25565b60200260200101516020015160ff16600183612c5b9092919063ffffffff16565b91505f9050610db98360ff86166002612c5b565b9050610dc58189614fff565b9750610dd1828d615012565b9b50610dde828287612cbc565b7f10de99b9032184587540c04e1850dff94a7683ae1fcc9eb06098621c739c0275338c8385604051610e139493929190615161565b60405180910390a150508651600101808852602002870183905250505b505b5060010161041f565b610e498260208a0135614fff565b965050508535851015610e92576040517f45094d880000000000000000000000000000000000000000000000000000000081528635600482015260248101869052604401610687565b8415610f5957610f593386610eaa60608a018a614dc1565b5f818110610eba57610eba614e25565b9050602002810190610ecc9190614e52565b610ed69080614f24565b610ee4906060810190614f56565b610ef160608c018c614dc1565b5f818110610f0157610f01614e25565b9050602002810190610f139190614e52565b60400135818110610f2657610f26614e25565b610f3c9260206060909202019081019150614534565b73ffffffffffffffffffffffffffffffffffffffff169190612f73565b5f610f676080880188615294565b90501115611111573363059bebe6610f826060890189614dc1565b5f818110610f9257610f92614e25565b9050602002810190610fa49190614e52565b610fae9080614f24565b610fbc906060810190614f56565b610fc960608b018b614dc1565b5f818110610fd957610fd9614e25565b9050602002810190610feb9190614e52565b60400135818110610ffe57610ffe614e25565b6110149260206060909202019081019150614534565b61102160608a018a614dc1565b5f81811061103157611031614e25565b90506020028101906110439190614e52565b61104d9080614f24565b61105b906040810190614f56565b61106860608c018c614dc1565b5f81811061107857611078614e25565b905060200281019061108a9190614e52565b6020013581811061109d5761109d614e25565b6110b39260206060909202019081019150614534565b88886110c260808d018d615294565b6040518763ffffffff1660e01b81526004016110e39695949392919061533c565b5f604051808303815f87803b1580156110fa575f80fd5b505af115801561110c573d5f803e3d5ffd5b505050505b83156111da576111da33308661112a60608b018b614dc1565b5f81811061113a5761113a614e25565b905060200281019061114c9190614e52565b6111569080614f24565b611164906040810190614f56565b61117160608d018d614dc1565b5f81811061118157611181614e25565b90506020028101906111939190614e52565b602001358181106111a6576111a6614e25565b6111bc9260206060909202019081019150614534565b73ffffffffffffffffffffffffffffffffffffffff1692919061304c565b5f5b815181101561120f576112078282815181106111fa576111fa614e25565b60200260200101516130b0565b6001016111dc565b5050505061121c60015f55565b915091565b5f61124373ffffffffffffffffffffffffffffffffffffffff86168786612f73565b6040517f23e30c8b0000000000000000000000000000000000000000000000000000000081525f9073ffffffffffffffffffffffffffffffffffffffff8816906323e30c8b906112a19033908a908a9087908b908b9060040161533c565b6020604051808303815f875af11580156112bd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112e1919061538d565b90507f439148f0bbc682ca079e46d6e2c2f0c1e3b820f1a291b069d8882abf8cf18dd9811461133f576040517f5b62c54800000000000000000000000000000000000000000000000000000000815260048101829052602401610687565b61136d873061134e5f89615012565b73ffffffffffffffffffffffffffffffffffffffff8a1692919061304c565b5060019695505050505050565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201525f9073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa1580156113e4573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610352919061538d565b5f611411612450565b61141e6020850185614534565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146114b0573361145e6020860186614534565b6040517f4702b91400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff928316600482015291166024820152604401610687565b5f6114c26114bd866153a4565b6124c1565b5f818152600160205260409020549091507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01611593575f8181526001602081905260408083209290925590519092507fa2d7a96afe77c99b6a2d72ca8b4d3c5c88b6466ee34ca74e0955951f449425c89061154390339084908990615528565b60405180910390a16115935f5b60405190808252806020026020018201604052801561158357816020015b606081526020019060019003908161156e5790505b5061158e8587615635565b6132eb565b5061159d60015f55565b9392505050565b6115ac612450565b825f0361160a576040517f40e97a5e00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8616602482015260448101859052606401610687565b6040805133815273ffffffffffffffffffffffffffffffffffffffff87166020820152908101859052606081018490527fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d79060800160405180910390a161168973ffffffffffffffffffffffffffffffffffffffff861633308661304c565b335f90815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff891684528252808320878452909152812080548592906116d0908490615012565b9091555061171990505f5b60405190808252806020026020018201604052801561170e57816020015b60608152602001906001900390816116f95790505b5061158e8385615635565b61172260015f55565b5050505050565b611731612450565b8351855173ffffffffffffffffffffffffffffffffffffffff9182169116036117a15784516040517f227e4ce900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091166004820152602401610687565b83604001518360400135815181106117bb576117bb614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1685606001518460200135815181106117f6576117f6614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff16146118b957846060015183602001358151811061183657611836614e25565b60200260200101515f0151846040015184604001358151811061185b5761185b614e25565b6020908102919091010151516040517ff902523f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff928316600482015291166024820152604401610687565b83604001518360400135815181106118d3576118d3614e25565b60200260200101516020015160ff1685606001518460200135815181106118fc576118fc614e25565b60200260200101516020015160ff161461199f57846060015183602001358151811061192a5761192a614e25565b602002602001015160200151846040015184604001358151811061195057611950614e25565b6020026020010151602001516040517f0f6ce47700000000000000000000000000000000000000000000000000000000815260040161068792919060ff92831681529116602082015260400190565b6040850151805184359081106119b7576119b7614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1684606001518460600135815181106119f2576119f2614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1614611a5557604085015180518435908110611a3057611a30614e25565b60200260200101515f0151846060015184606001358151811061185b5761185b614e25565b604085015180518435908110611a6d57611a6d614e25565b60200260200101516020015160ff168460600151846060013581518110611a9657611a96614e25565b60200260200101516020015160ff1614611ae857604085015180518435908110611ac257611ac2614e25565b602002602001015160200151846060015184606001358151811061195057611950614e25565b5f60015f611af5886124c1565b81526020019081526020015f205403611b72577fb70c12fa453793fa6818ec07c91e74363a47aa6a6829dcd9533937fdf30314f333865f0151611b37886124c1565b6040805173ffffffffffffffffffffffffffffffffffffffff94851681529390921660208401529082015260600160405180910390a1611719565b5f60015f611b7f876124c1565b81526020019081526020015f205403611bc1577fb70c12fa453793fa6818ec07c91e74363a47aa6a6829dcd9533937fdf30314f333855f0151611b37876124c1565b7f692ee69af2843c70772be93470669f3c73e583316a047b6bfefdae5629de37ce33868686604051611bf694939291906156f5565b60405180910390a15f611c1686855f01358660200135885f0151866124f0565b90505f611c3186866040013587606001358a5f0151886124f0565b90505f611c3e83836134dd565b9050611c528160400151825f015185612cbc565b611c658160600151826020015184612cbc565b606081015181515f91611c7791614fff565b90505f82604001518360200151611c8e9190614fff565b90508115611d2e57335f908152600260209081526040822060608d01518051869492938d0135908110611cc357611cc3614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8a6080013581526020019081526020015f205f828254611d289190615012565b90915550505b8015611dca57335f9081526002602052604081206060808c015180518594928d0135908110611d5f57611d5f614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8a60a0013581526020019081526020015f205f828254611dc49190615012565b90915550505b5050604080513381528251602080830191909152830151818301529082015160608083019190915282015160808201527f3f20e55919cca701abb2a40ab72542b25ea7eed63a50f979dd2cd3231e5f488d9060a00160405180910390a1611e30836130b0565b611e39826130b0565b50505061172260015f55565b5f611e4e612450565b611e5b6020850185614f56565b90505f03611e95576040517f6c44ef8f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611ea26040850185614f56565b90505f03611edc576040517f540e5f0b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040805160a081019091523381525f9060208101611efa878061577e565b611f03906157b0565b8152602001868060200190611f189190614f56565b808060200260200160405190810160405280939291908181526020015f905b82821015611f6357611f54606083028601368190038101906157bb565b81526020019060010190611f37565b5050509183525050602001611f7b6040880188614f56565b808060200260200160405190810160405280939291908181526020015f905b82821015611fc657611fb7606083028601368190038101906157bb565b81526020019060010190611f9a565b50505050508152602001866060013581525090505f611fe4826124c1565b5f8181526001602052604090205490915015801561212b575f8281526001602081905260409182902055835190517f3ce8bbe652d8778b67dd565c479c3bbaa843e55e477d075f756f889ec4bbdaee9161204191859087906157d5565b60405180910390a15f61205760a0890189615294565b905011156120f3576120a861206f60a0890189615294565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525061352f92505050565b82517fd46c2c56b35c8210e9e712ec3f02242d5fc90187c0ac8ed80cc33626846ec36990836120da60a08b018b615294565b6040516120ea9493929190615809565b60405180910390a15b604080515f8082526020820190925261212b91612120565b606081526020019060019003908161210b5790505b5061158e8789615635565b9250505061159d60015f55565b604080515f8152602081019091526060908267ffffffffffffffff81111561216257612162614659565b60405190808252806020026020018201604052801561219557816020015b60608152602001906001900390816121805790505b5091505f5b83811015612216576121f1308686848181106121b8576121b8614e25565b90506020028101906121ca9190615294565b856040516020016121dd93929190615855565b604051602081830303815290604052613573565b83828151811061220357612203614e25565b602090810291909101015260010161219a565b505092915050565b612226612450565b61222f5f6116db565b61223860015f55565b5050565b5f80808061225661224d8680614f24565b6114bd906153a4565b5f818152600160208190526040909120549192501461227e575f805f935093509350506122d2565b5f6122bb61228c8780614f24565b612295906153a4565b60208801356040890135336122ad60608c018c614dc1565b6122b69161586a565b6124f0565b905060018160400151826060015194509450945050505b9193909250565b6122e1612450565b825f0361233f576040517ff7a898f600000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8616602482015260448101859052606401610687565b335f90815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff891684528252808320878452909152812054906123828583613598565b90508015612445576123948183614fff565b335f81815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff8d168085529083528184208c855283529281902094909455835192835282015290810187905260608101869052608081018290527febff2602b3f468259e1e99f613fed6691f3a6526effe6ef3e768ba7ae7a36c4f9060a00160405180910390a161243c73ffffffffffffffffffffffffffffffffffffffff88163383612f73565b6124455f611550565b505061172260015f55565b60025f54036124bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610687565b60025f55565b5f816040516020016124d39190615876565b604051602081830303815290604052805190602001209050919050565b6124f861438f565b5f612502876124c1565b60408051600480825260a082019092529192506060915f91816020015b606081526020019060019003908161251f57905050895160408051600381526020810187905273ffffffffffffffffffffffffffffffffffffffff92831681830152918916606083015260808201905290915081600180038151811061258757612587614e25565b6020026020010181905250612712896040015189815181106125ab576125ab614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff168a604001518a815181106125e2576125e2614e25565b60200260200101516020015160ff168b604001518b8151811061260757612607614e25565b60200260200101516040015160025f8e5f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8e604001518e8151811061266a5761266a614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8e604001518e815181106126c5576126c5614e25565b60200260200101516040015181526020019081526020015f20545f60408051600581526020810196909652858101949094526060850192909252608084015260a083015260c08201905290565b8160016003038151811061272857612728614e25565b60200260200101819052506128668960600151888151811061274c5761274c614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff168a60600151898151811061278357612783614e25565b60200260200101516020015160ff168b606001518a815181106127a8576127a8614e25565b60200260200101516040015160025f8e5f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8e606001518d8151811061280b5761280b614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8e606001518d815181106126c5576126c5614e25565b8160016004038151811061287c5761287c614e25565b602002602001018190525061289181866135ad565b9150505f885f015173ffffffffffffffffffffffffffffffffffffffff1690505f808a602001515f015173ffffffffffffffffffffffffffffffffffffffff1663d6e3357a8c60200151602001516128f286305f9182526020526040902090565b60208f0151604001515f8981604051908082528060200260200182016040528015612927578160200160208202803683370190505b506040518763ffffffff1660e01b8152600401612949969594939291906158f1565b5f60405180830381865afa158015612963573d5f803e3d5ffd5b505050506040513d5f823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526129a891908101906159c5565b915091506002825110156129ed5781516040517f3eee395400000000000000000000000000000000000000000000000000000000815260040161068791815260200190565b5f82600181518110612a0157612a01614e25565b602002602001015190505f835f81518110612a1e57612a1e614e25565b602002602001015190505f60025f8f5f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8f606001518e81518110612a8057612a80614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8f606001518e81518110612adb57612adb614e25565b60200260200101516040015181526020019081526020015f205490505f612b318f606001518e81518110612b1157612b11614e25565b60200260200101516020015160ff165f84612bba9092919063ffffffff16565b905080841115612b3f578093505b50506040805160028152602081018490528082018390526060810190915286600281518110612b7057612b70614e25565b6020908102919091018101919091526040805160e0810182529e8f52908e019b909b52998c015260608b019890985250608089019190915260a08801525050505060c08301525090565b5f8260121115612bee5760128390036002831615612be457612bdc85826138b3565b91505061159d565b612bdc858261393e565b6012831115612c37577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee83016001831615612c2d57612bdc8582613975565b612bdc85826139c1565b508261159d565b5f612c538484670de0b6b3a7640000856139e3565b949350505050565b5f8260121115612c7d5760128390036001831615612c2d57612bdc8582613975565b6012831115612c37577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee83016002831615612be457612bdc85826138b3565b828160800151600381518110612cd457612cd4614e25565b6020026020010151600481518110612cee57612cee614e25565b602002602001018181525050818160800151600481518110612d1257612d12614e25565b6020026020010151600481518110612d2c57612d2c614e25565b60209081029190910101528215612e345780515173ffffffffffffffffffffffffffffffffffffffff165f90815260026020526040812060808301518051869391906003908110612d7f57612d7f614e25565b60200260200101515f81518110612d9857612d98614e25565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8360800151600381518110612df157612df1614e25565b6020026020010151600281518110612e0b57612e0b614e25565b602002602001015181526020019081526020015f205f828254612e2e9190615012565b90915550505b8115612f315780515173ffffffffffffffffffffffffffffffffffffffff165f90815260026020526040812060808301518051859391906004908110612e7c57612e7c614e25565b60200260200101515f81518110612e9557612e95614e25565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8360800151600481518110612eee57612eee614e25565b6020026020010151600281518110612f0857612f08614e25565b602002602001015181526020019081526020015f205f828254612f2b9190614fff565b90915550505b7f17a5c0f3785132a57703932032f6863e7920434150aa1dc940e567b440fdce1f338260800151604051612f66929190615a25565b60405180910390a1505050565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526130479084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152613a3e565b505050565b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526130aa9085907f23b872dd0000000000000000000000000000000000000000000000000000000090608401612fc5565b50505050565b60c08101515115613150578051602090810151015160a082015160c08301516040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9093169263946aadc692613122929091600401615a53565b5f604051808303815f87803b158015613139575f80fd5b505af115801561314b573d5f803e3d5ffd5b505050505b805160209081015180519082015160a08401515f9081523090935260408320839273ffffffffffffffffffffffffffffffffffffffff169163d6e3357a918651602001516040015160808801516001905f6040519080825280602002602001820160405280156131ca578160200160208202803683370190505b506040518763ffffffff1660e01b81526004016131ec969594939291906158f1565b5f60405180830381865afa158015613206573d5f803e3d5ffd5b505050506040513d5f823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261324b91908101906159c5565b8051919350915015613047578251602090810151015160a08401516040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9092169163946aadc6916132b9918590600401615a53565b5f604051808303815f87803b1580156132d0575f80fd5b505af11580156132e2573d5f803e3d5ffd5b50505050505050565b3361331d6040805160a0810182525f918101828152606080830193909352608082018390528152602081019190915290565b5f5b83518110156117225783818151811061333a5761333a614e25565b602002602001015191505f80835f01515f015173ffffffffffffffffffffffffffffffffffffffff1663d6e3357a855f01516020015161338388305f9182526020526040902090565b875f0151604001515f61339a8d8b602001516135ad565b604080515f815260208101918290527fffffffff0000000000000000000000000000000000000000000000000000000060e089901b169091526133e5959493929190602481016158f1565b5f60405180830381865afa1580156133ff573d5f803e3d5ffd5b505050506040513d5f823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261344491908101906159c5565b8551602001516040517f946aadc600000000000000000000000000000000000000000000000000000000815292945090925073ffffffffffffffffffffffffffffffffffffffff169063946aadc6906134a39088908590600401615a53565b5f604051808303815f87803b1580156134ba575f80fd5b505af11580156134cc573d5f803e3d5ffd5b50505050505080600101905061331f565b61350460405180608001604052805f81526020015f81526020015f81526020015f81525090565b61350e8383613b4b565b8252604082015261351f8284613b4b565b6020830152606082015292915050565b61353881613c0a565b61357057806040517f644cc2580000000000000000000000000000000000000000000000000000000081526004016106879190615a6b565b50565b606061159d8383604051806060016040528060278152602001615c5a60279139613c38565b5f8183106135a6578161159d565b5090919050565b60605f825167ffffffffffffffff8111156135ca576135ca614659565b6040519080825280602002602001820160405280156135f3578160200160208202803683370190505b5090505f80845111613605575f61360b565b83516001015b85516001010190505f8167ffffffffffffffff81111561362d5761362d614659565b60405190808252806020026020018201604052801561366057816020015b606081526020019060019003908161364b5790505b5090505f613684604080516002815233602082015230818301526060810190915290565b82828151811061369657613696614e25565b60200260200101819052505f5b87518110156136f35781806001019250508781815181106136c6576136c6614e25565b60200260200101518383815181106136e0576136e0614e25565b60209081029190910101526001016136a3565b508551156138a95780806001019150508382828151811061371657613716614e25565b60200260200101819052505f5b86518110156138a7576137d287828151811061374157613741614e25565b60200260200101515f01516137af61377d8a858151811061376457613764614e25565b6020026020010151602001518051602090810291012090565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f908152601c91909152603c902090565b8984815181106137c1576137c1614e25565b602002602001015160400151613cb9565b61380b576040517f52bf984800000000000000000000000000000000000000000000000000000000815260048101829052602401610687565b86818151811061381d5761381d614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1685828151811061385057613850614e25565b602002602001018181525050818060010192505086818151811061387657613876614e25565b60200260200101516020015183838151811061389457613894614e25565b6020908102919091010152600101613723565b505b5095945050505050565b5f604e82106138f15782156138e8577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6138ea565b5f5b9050610352565b50600a81900a828102908381838161390b5761390b615a7d565b0414613937577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff612c53565b5092915050565b600a81900a61394d8184615aaa565b9050604e821061035257821561396d5761396882600a615bdf565b61159d565b505f92915050565b5f604e821061399757821561398b57600161398d565b5f5b60ff169050610352565b600a82900a8084816139ab576139ab615a7d565b0491508082028414613937575060010192915050565b5f604e82101561396d5781600a0a83816139dd576139dd615a7d565b0461159d565b5f806139f0868686613d27565b90506001836002811115613a0657613a06615bea565b148015613a2257505f8480613a1d57613a1d615a7d565b868809115b15613a3557613a32600182615012565b90505b95945050505050565b5f613a9f826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16613e4d9092919063ffffffff16565b905080515f1480613abf575080806020019051810190613abf9190615c17565b613047576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610687565b5f805f613b6c846060015160018660400151612c3e9092919063ffffffff16565b604086015190915081811115613b7f5750805b613bbf865f015160600151876020015181518110613b9f57613b9f614e25565b60200260200101516020015160ff165f83612c5b9092919063ffffffff16565b92505f613bdc8760600151600184612c3e9092919063ffffffff16565b9050613bfe865f015160600151876020015181518110610d8457610d84614e25565b94505050509250929050565b5f600882511015613c1c57505f919050565b506008015167ffffffffffffffff1667ff0a89c674ee78741490565b60605f808573ffffffffffffffffffffffffffffffffffffffff1685604051613c619190615c36565b5f60405180830381855af49150503d805f8114613c99576040519150601f19603f3d011682016040523d82523d5f602084013e613c9e565b606091505b5091509150613caf86838387613e5b565b9695505050505050565b5f805f613cc68585613efa565b90925090505f816004811115613cde57613cde615bea565b148015613d1657508573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b80613caf5750613caf868686613f3c565b5f80807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff858709858702925082811083820303915050805f03613d7d57838281613d7357613d73615a7d565b049250505061159d565b808411613de6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f4d6174683a206d756c446976206f766572666c6f7700000000000000000000006044820152606401610687565b5f8486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091025f889003889004909101858311909403939093029303949094049190911702949350505050565b6060612c5384845f85614094565b60608315613ef05782515f03613ee95773ffffffffffffffffffffffffffffffffffffffff85163b613ee9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610687565b5081612c53565b612c5383836141a9565b5f808251604103613f2e576020830151604084015160608501515f1a613f22878285856141ed565b94509450505050613f35565b505f905060025b9250929050565b5f805f8573ffffffffffffffffffffffffffffffffffffffff16631626ba7e60e01b8686604051602401613f71929190615c41565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909416939093179092529051613ffa9190615c36565b5f60405180830381855afa9150503d805f8114614032576040519150601f19603f3d011682016040523d82523d5f602084013e614037565b606091505b509150915081801561404b57506020815110155b8015613caf575080517f1626ba7e0000000000000000000000000000000000000000000000000000000090614089908301602090810190840161538d565b149695505050505050565b606082471015614126576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610687565b5f808673ffffffffffffffffffffffffffffffffffffffff16858760405161414e9190615c36565b5f6040518083038185875af1925050503d805f8114614188576040519150601f19603f3d011682016040523d82523d5f602084013e61418d565b606091505b509150915061419e87838387613e5b565b979650505050505050565b8151156141b95781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106879190615a6b565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561422257505f905060036142cc565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015614273573d5f803e3d5ffd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81166142c6575f600192509250506142cc565b91505f90505b94509492505050565b60405180608001604052806142e8614301565b81526020015f81526020015f8152602001606081525090565b6040518060a001604052805f73ffffffffffffffffffffffffffffffffffffffff16815260200161437660405180606001604052805f73ffffffffffffffffffffffffffffffffffffffff1681526020015f73ffffffffffffffffffffffffffffffffffffffff168152602001606081525090565b8152606060208201819052604082018190525f91015290565b6040518060e001604052806143a2614301565b81526020015f81526020015f81526020015f8152602001606081526020015f8152602001606081525090565b5f602082840312156143de575f80fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461159d575f80fd5b5f60a0828403121561441d575f80fd5b50919050565b5f60208284031215614433575f80fd5b813567ffffffffffffffff811115614449575f80fd5b612c538482850161440d565b5f60208284031215614465575f80fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff81168114613570575f80fd5b80356144988161446c565b919050565b5f805f805f608086880312156144b1575f80fd5b85356144bc8161446c565b945060208601356144cc8161446c565b935060408601359250606086013567ffffffffffffffff808211156144ef575f80fd5b818801915088601f830112614502575f80fd5b813581811115614510575f80fd5b896020828501011115614521575f80fd5b9699959850939650602001949392505050565b5f60208284031215614544575f80fd5b813561159d8161446c565b5f8083601f84011261455f575f80fd5b50813567ffffffffffffffff811115614576575f80fd5b6020830191508360208260051b8501011115613f35575f80fd5b5f805f604084860312156145a2575f80fd5b833567ffffffffffffffff808211156145b9575f80fd5b6145c58783880161440d565b945060208601359150808211156145da575f80fd5b506145e78682870161454f565b9497909650939450505050565b5f805f805f60808688031215614608575f80fd5b85356146138161446c565b94506020860135935060408601359250606086013567ffffffffffffffff81111561463c575f80fd5b6146488882890161454f565b969995985093965092949392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6040516060810167ffffffffffffffff811182821017156146a9576146a9614659565b60405290565b60405160a0810167ffffffffffffffff811182821017156146a9576146a9614659565b6040805190810167ffffffffffffffff811182821017156146a9576146a9614659565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561473c5761473c614659565b604052919050565b5f82601f830112614753575f80fd5b813567ffffffffffffffff81111561476d5761476d614659565b61479e60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016146f5565b8181528460208386010111156147b2575f80fd5b816020850160208301375f918101602001919091529392505050565b5f606082840312156147de575f80fd5b6147e6614686565b905081356147f38161446c565b815260208201356148038161446c565b6020820152604082013567ffffffffffffffff811115614821575f80fd5b61482d84828501614744565b60408301525092915050565b5f67ffffffffffffffff82111561485257614852614659565b5060051b60200190565b803560ff81168114614498575f80fd5b5f6060828403121561487c575f80fd5b614884614686565b905081356148918161446c565b815261489f6020830161485c565b60208201526040820135604082015292915050565b5f82601f8301126148c3575f80fd5b813560206148d86148d383614839565b6146f5565b8083825260208201915060606020606086028801019450878511156148fb575f80fd5b602087015b8581101561491f57614912898261486c565b8452928401928101614900565b5090979650505050505050565b5f60a0828403121561493c575f80fd5b6149446146af565b905061494f8261448d565b8152602082013567ffffffffffffffff8082111561496b575f80fd5b614977858386016147ce565b6020840152604084013591508082111561498f575f80fd5b61499b858386016148b4565b604084015260608401359150808211156149b3575f80fd5b506149c0848285016148b4565b6060830152506080820135608082015292915050565b5f60c0828403121561441d575f80fd5b5f6149f36148d384614839565b8381529050602080820190600585811b850187811115614a11575f80fd5b855b81811015614afe57803567ffffffffffffffff80821115614a32575f80fd5b908801906060828c031215614a45575f80fd5b614a4d614686565b8235614a588161446c565b81528287013582811115614a6a575f80fd5b8301601f81018d13614a7a575f80fd5b8035614a886148d382614839565b81815290881b8201890190898101908f831115614aa3575f80fd5b928a01925b82841015614ac15783358252928a0192908a0190614aa8565b848b01525060409150508381013583811115614adb575f80fd5b614ae78e828701614744565b918301919091525087525050938301938301614a13565b50505050509392505050565b5f82601f830112614b19575f80fd5b61159d838335602085016149e6565b5f805f805f6101408688031215614b3d575f80fd5b853567ffffffffffffffff80821115614b54575f80fd5b614b6089838a0161492c565b96506020880135915080821115614b75575f80fd5b614b8189838a0161492c565b9550614b908960408a016149d6565b9450610100880135915080821115614ba6575f80fd5b614bb289838a01614b0a565b9350610120880135915080821115614bc8575f80fd5b50614bd588828901614b0a565b9150509295509295909350565b5f805f60408486031215614bf4575f80fd5b833567ffffffffffffffff80821115614c0b575f80fd5b6145c5878388016149d6565b5f8060208385031215614c28575f80fd5b823567ffffffffffffffff811115614c3e575f80fd5b614c4a8582860161454f565b90969095509350505050565b5f81518084528060208401602086015e5f6020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b5f60208083016020845280855180835260408601915060408160051b8701019250602087015f5b82811015614d15577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0888603018452614d03858351614c56565b94509285019290850190600101614cc9565b5092979650505050505050565b5f805f60608486031215614d34575f80fd5b8335614d3f8161446c565b92506020840135614d4f8161446c565b929592945050506040919091013590565b5f8060408385031215614d71575f80fd5b8235614d7c8161446c565b946020939093013593505050565b5f60208284031215614d9a575f80fd5b813567ffffffffffffffff811115614db0575f80fd5b82016080818503121561159d575f80fd5b5f8083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112614df4575f80fd5b83018035915067ffffffffffffffff821115614e0e575f80fd5b6020019150600581901b3603821315613f35575f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b5f82357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81833603018112614e84575f80fd5b9190910192915050565b5f60808236031215614e9e575f80fd5b6040516080810167ffffffffffffffff8282108183111715614ec257614ec2614659565b816040528435915080821115614ed6575f80fd5b614ee23683870161492c565b835260208501356020840152604085013560408401526060850135915080821115614f0b575f80fd5b50614f1836828601614b0a565b60608301525092915050565b5f82357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61833603018112614e84575f80fd5b5f8083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112614f89575f80fd5b83018035915067ffffffffffffffff821115614fa3575f80fd5b6020019150606081023603821315613f35575f80fd5b5f60208284031215614fc9575f80fd5b61159d8261485c565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b8181038181111561035257610352614fd2565b8082018082111561035257610352614fd2565b5f815180845260208085019450602084015f5b83811015615083578151805173ffffffffffffffffffffffffffffffffffffffff1688528381015160ff16848901526040908101519088015260609096019590820190600101615038565b509495945050505050565b5f73ffffffffffffffffffffffffffffffffffffffff808351168452602083015160a060208601528181511660a08601528160208201511660c08601526040810151915050606060e08501526150e8610100850182614c56565b9050604083015184820360408601526151018282615025565b9150506060830151848203606086015261511b8282615025565b915050608083015160808501528091505092915050565b5f815180845260208085019450602084015f5b8381101561508357815187529582019590820190600101615145565b5f73ffffffffffffffffffffffffffffffffffffffff80871683526020608081850152865160808086015261519a61010086018261508e565b90508188015160a086015260408089015160c08701526060808a01517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff808885030160e08901528381518086528686019150868160051b87010187840193505f5b82811015615272577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe088830301845284518a815116835289810151878b85015261524688850182615132565b91890151848303858b015291905061525e8183614c56565b968b0196958b0195935050506001016151fa565b5080995050505050505050505083604083015282606083015295945050505050565b5f8083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126152c7575f80fd5b83018035915067ffffffffffffffff8211156152e1575f80fd5b602001915036819003821315613f35575f80fd5b81835281816020850137505f602082840101525f60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b5f73ffffffffffffffffffffffffffffffffffffffff808916835280881660208401525085604083015284606083015260a0608083015261538160a0830184866152f5565b98975050505050505050565b5f6020828403121561539d575f80fd5b5051919050565b5f610352368361492c565b5f81356153bb8161446c565b73ffffffffffffffffffffffffffffffffffffffff90811684526020830135906153e48261446c565b1660208401526040820135368390037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe101811261541f575f80fd5b820160208101903567ffffffffffffffff81111561543b575f80fd5b803603821315615449575f80fd5b60606040860152613a356060860182846152f5565b5f8083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112615491575f80fd5b830160208101925035905067ffffffffffffffff8111156154b0575f80fd5b606081023603821315613f35575f80fd5b8183525f60208085019450825f5b858110156150835781356154e28161446c565b73ffffffffffffffffffffffffffffffffffffffff16875260ff61550783850161485c565b168784015260408281013590880152606096870196909101906001016154cf565b5f73ffffffffffffffffffffffffffffffffffffffff808616835284602084015260606040840152833561555b8161446c565b1660608301526020830135368490037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa1018112615596575f80fd5b60a060808401526155ad61010084018583016153af565b90506155bc604085018561545e565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa0808685030160a08701526155f28483856154c1565b9350615601606088018861545e565b93509150808685030160c08701525061561b8383836154c1565b92505050608084013560e084015280915050949350505050565b5f6156426148d384614839565b80848252602080830192508560051b85013681111561565f575f80fd5b855b818110156156e957803567ffffffffffffffff80821115615680575f80fd5b818901915060408236031215615694575f80fd5b61569c6146d2565b8235828111156156aa575f80fd5b6156b6368286016147ce565b82525085830135828111156156c9575f80fd5b6156d536828601614b0a565b828801525087525050938201938201615661565b50919695505050505050565b5f61012073ffffffffffffffffffffffffffffffffffffffff871683528060208401526157248184018761508e565b90508281036040840152615738818661508e565b9150508235606083015260208301356080830152604083013560a0830152606083013560c0830152608083013560e083015260a083013561010083015295945050505050565b5f82357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa1833603018112614e84575f80fd5b5f61035236836147ce565b5f606082840312156157cb575f80fd5b61159d838361486c565b73ffffffffffffffffffffffffffffffffffffffff84168152826020820152606060408201525f613a35606083018461508e565b73ffffffffffffffffffffffffffffffffffffffff85168152836020820152606060408201525f613caf6060830184866152f5565b5f81518060208401855e5f93019283525090919050565b828482375f8382015f8152613caf818561583e565b5f61159d3684846149e6565b602081525f61159d602083018461508e565b5f8282518085526020808601955060208260051b840101602086015f5b8481101561491f577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08684030189526158df838351615132565b988401989250908301906001016158a5565b73ffffffffffffffffffffffffffffffffffffffff8716815285602082015260c060408201525f61592560c0830187614c56565b856060840152828103608084015261593d8186615888565b905082810360a08401526159518185615132565b9998505050505050505050565b5f82601f83011261596d575f80fd5b8151602061597d6148d383614839565b8083825260208201915060208460051b87010193508684111561599e575f80fd5b602086015b848110156159ba57805183529183019183016159a3565b509695505050505050565b5f80604083850312156159d6575f80fd5b825167ffffffffffffffff808211156159ed575f80fd5b6159f98683870161595e565b93506020850151915080821115615a0e575f80fd5b50615a1b8582860161595e565b9150509250929050565b73ffffffffffffffffffffffffffffffffffffffff83168152604060208201525f612c536040830184615888565b828152604060208201525f612c536040830184615132565b602081525f61159d6020830184614c56565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b808202811582820484141761035257610352614fd2565b600181815b80851115615b1a57817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115615b0057615b00614fd2565b80851615615b0d57918102915b93841c9390800290615ac6565b509250929050565b5f82615b3057506001610352565b81615b3c57505f610352565b8160018114615b525760028114615b5c57615b78565b6001915050610352565b60ff841115615b6d57615b6d614fd2565b50506001821b610352565b5060208310610133831016604e8410600b8410161715615b9b575081810a610352565b615ba58383615ac1565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115615bd757615bd7614fd2565b029392505050565b5f61159d8383615b22565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602160045260245ffd5b5f60208284031215615c27575f80fd5b8151801515811461159d575f80fd5b5f61159d828461583e565b828152604060208201525f612c536040830184614c5656fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564',
		sourceMap: '7951:35757:375:-:0;;;;;;;;;;;;-1:-1:-1;1716:1:301;1821:7;:22;7951:35757:375;;;;;;',
		linkReferences: {}
	},
	deployedBytecode: {
		object:
			'0x608060405234801561000f575f80fd5b50600436106100f0575f3560e01c8063a08f5dff11610093578063d97b2e4811610063578063d97b2e481461021c578063d9d98ce414610268578063e0e530b71461027d578063f513c42d146102ad575f80fd5b8063a08f5dff146101c3578063a616864d146101d6578063ac9650d8146101e9578063c1e4c4af14610209575f80fd5b80635cffe9de116100ce5780635cffe9de14610167578063613255ab1461017a5780638d7b6beb1461019b57806391337c0a146101ae575f80fd5b806301ffc9a7146100f45780630997c4a01461011c5780632cb77e9f14610144575b5f80fd5b6101076101023660046143ce565b6102c0565b60405190151581526020015b60405180910390f35b61012f61012a366004614423565b610358565b60408051928352602083019190915201610113565b610107610152366004614455565b5f908152600160208190526040909120541490565b61010761017536600461449d565b611221565b61018d610188366004614534565b61137a565b604051908152602001610113565b6101076101a9366004614590565b611408565b6101c16101bc3660046145f4565b6115a4565b005b6101c16101d1366004614b28565b611729565b6101076101e4366004614be2565b611e45565b6101fc6101f7366004614c17565b612138565b6040516101139190614ca2565b6101c1610217366004614c17565b61221e565b61018d61022a366004614d22565b73ffffffffffffffffffffffffffffffffffffffff9283165f9081526002602090815260408083209490951682529283528381209181529152205490565b61018d610276366004614d60565b5f92915050565b61029061028b366004614d8a565b61223c565b604080519315158452602084019290925290820152606001610113565b6101c16102bb3660046145f4565b6122d9565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082167fe414309100000000000000000000000000000000000000000000000000000000148061035257507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b5f80610362612450565b61036f6060840184614dc1565b90505f036103a9576040517f9c95219f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103b16142d5565b6103b9614301565b60605f6103c887830188614dc1565b6040805160206001939093018302810190915293508801359150505f81900361041d576040517fc2ee700900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5b61042c6060890189614dc1565b90508110801561043b57505f82115b15610e3b5761044d6060890189614dc1565b8281811061045d5761045d614e25565b905060200281019061046f9190614e52565b61047890614e8e565b8051909550935061048c6060890189614dc1565b5f81811061049c5761049c614e25565b90506020028101906104ae9190614e52565b6104b89080614f24565b6104c6906040810190614f56565b6104d360608b018b614dc1565b5f8181106104e3576104e3614e25565b90506020028101906104f59190614e52565b6020013581811061050857610508614e25565b61051e9260206060909202019081019150614534565b73ffffffffffffffffffffffffffffffffffffffff16846040015186602001518151811061054e5761054e614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff161461069057836040015185602001518151811061058e5761058e614e25565b6020908102919091010151516105a760608a018a614dc1565b5f8181106105b7576105b7614e25565b90506020028101906105c99190614e52565b6105d39080614f24565b6105e1906040810190614f56565b6105ee60608c018c614dc1565b5f8181106105fe576105fe614e25565b90506020028101906106109190614e52565b6020013581811061062357610623614e25565b6106399260206060909202019081019150614534565b6040517ff902523f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9283166004820152911660248201526044015b60405180910390fd5b61069d6060890189614dc1565b5f8181106106ad576106ad614e25565b90506020028101906106bf9190614e52565b6106c99080614f24565b6106d7906060810190614f56565b6106e460608b018b614dc1565b5f8181106106f4576106f4614e25565b90506020028101906107069190614e52565b6040013581811061071957610719614e25565b61072f9260206060909202019081019150614534565b73ffffffffffffffffffffffffffffffffffffffff16846060015186604001518151811061075f5761075f614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff161461083457836060015185604001518151811061079f5761079f614e25565b6020908102919091010151516107b860608a018a614dc1565b5f8181106107c8576107c8614e25565b90506020028101906107da9190614e52565b6107e49080614f24565b6107f2906060810190614f56565b6107ff60608c018c614dc1565b5f81811061080f5761080f614e25565b90506020028101906108219190614e52565b6040013581811061062357610623614e25565b6108416060890189614dc1565b5f81811061085157610851614e25565b90506020028101906108639190614e52565b61086d9080614f24565b61087b906040810190614f56565b61088860608b018b614dc1565b5f81811061089857610898614e25565b90506020028101906108aa9190614e52565b602001358181106108bd576108bd614e25565b90506060020160200160208101906108d59190614fb9565b60ff1684604001518660200151815181106108f2576108f2614e25565b60200260200101516020015160ff1614610a0f57836040015185602001518151811061092057610920614e25565b60200260200101516020015188806060019061093c9190614dc1565b5f81811061094c5761094c614e25565b905060200281019061095e9190614e52565b6109689080614f24565b610976906040810190614f56565b61098360608c018c614dc1565b5f81811061099357610993614e25565b90506020028101906109a59190614e52565b602001358181106109b8576109b8614e25565b90506060020160200160208101906109d09190614fb9565b6040517f0f6ce47700000000000000000000000000000000000000000000000000000000815260ff928316600482015291166024820152604401610687565b610a1c6060890189614dc1565b5f818110610a2c57610a2c614e25565b9050602002810190610a3e9190614e52565b610a489080614f24565b610a56906060810190614f56565b610a6360608b018b614dc1565b5f818110610a7357610a73614e25565b9050602002810190610a859190614e52565b60400135818110610a9857610a98614e25565b9050606002016020016020810190610ab09190614fb9565b60ff168460600151866040015181518110610acd57610acd614e25565b60200260200101516020015160ff1614610b93578360600151856040015181518110610afb57610afb614e25565b602002602001015160200151888060600190610b179190614dc1565b5f818110610b2757610b27614e25565b9050602002810190610b399190614e52565b610b439080614f24565b610b51906060810190614f56565b610b5e60608c018c614dc1565b5f818110610b6e57610b6e614e25565b9050602002810190610b809190614e52565b604001358181106109b8576109b8614e25565b5f610b9d856124c1565b5f81815260016020526040902054909150610c0f5784516040805133815273ffffffffffffffffffffffffffffffffffffffff909216602083015281018290527fb70c12fa453793fa6818ec07c91e74363a47aa6a6829dcd9533937fdf30314f39060600160405180910390a1610e32565b5f610c298688602001518960400151338b606001516124f0565b9050896040013581606001511115610c995785516040805133815273ffffffffffffffffffffffffffffffffffffffff909216602083015281018390527fe3151dc8cb7a54ffc4baabd28c1f241c94d510b5e5b502491ac3cad6c16316d5906060015b60405180910390a1610e30565b80604001515f03610cf95785516040805133815273ffffffffffffffffffffffffffffffffffffffff909216602083015281018390527f500b713857325f9e6dcb52ae832eca9109d107ed1aae9cb4928b4c1e13f051aa90606001610c8c565b5f8660600151886040015181518110610d1457610d14614e25565b602090810291909101810151015160408301519091505f610d3a8760ff85166002612bba565b905080821115610d48578091505b505f80610d658560600151600185612c3e9092919063ffffffff16565b9050610da58a604001518c6020015181518110610d8457610d84614e25565b60200260200101516020015160ff16600183612c5b9092919063ffffffff16565b91505f9050610db98360ff86166002612c5b565b9050610dc58189614fff565b9750610dd1828d615012565b9b50610dde828287612cbc565b7f10de99b9032184587540c04e1850dff94a7683ae1fcc9eb06098621c739c0275338c8385604051610e139493929190615161565b60405180910390a150508651600101808852602002870183905250505b505b5060010161041f565b610e498260208a0135614fff565b965050508535851015610e92576040517f45094d880000000000000000000000000000000000000000000000000000000081528635600482015260248101869052604401610687565b8415610f5957610f593386610eaa60608a018a614dc1565b5f818110610eba57610eba614e25565b9050602002810190610ecc9190614e52565b610ed69080614f24565b610ee4906060810190614f56565b610ef160608c018c614dc1565b5f818110610f0157610f01614e25565b9050602002810190610f139190614e52565b60400135818110610f2657610f26614e25565b610f3c9260206060909202019081019150614534565b73ffffffffffffffffffffffffffffffffffffffff169190612f73565b5f610f676080880188615294565b90501115611111573363059bebe6610f826060890189614dc1565b5f818110610f9257610f92614e25565b9050602002810190610fa49190614e52565b610fae9080614f24565b610fbc906060810190614f56565b610fc960608b018b614dc1565b5f818110610fd957610fd9614e25565b9050602002810190610feb9190614e52565b60400135818110610ffe57610ffe614e25565b6110149260206060909202019081019150614534565b61102160608a018a614dc1565b5f81811061103157611031614e25565b90506020028101906110439190614e52565b61104d9080614f24565b61105b906040810190614f56565b61106860608c018c614dc1565b5f81811061107857611078614e25565b905060200281019061108a9190614e52565b6020013581811061109d5761109d614e25565b6110b39260206060909202019081019150614534565b88886110c260808d018d615294565b6040518763ffffffff1660e01b81526004016110e39695949392919061533c565b5f604051808303815f87803b1580156110fa575f80fd5b505af115801561110c573d5f803e3d5ffd5b505050505b83156111da576111da33308661112a60608b018b614dc1565b5f81811061113a5761113a614e25565b905060200281019061114c9190614e52565b6111569080614f24565b611164906040810190614f56565b61117160608d018d614dc1565b5f81811061118157611181614e25565b90506020028101906111939190614e52565b602001358181106111a6576111a6614e25565b6111bc9260206060909202019081019150614534565b73ffffffffffffffffffffffffffffffffffffffff1692919061304c565b5f5b815181101561120f576112078282815181106111fa576111fa614e25565b60200260200101516130b0565b6001016111dc565b5050505061121c60015f55565b915091565b5f61124373ffffffffffffffffffffffffffffffffffffffff86168786612f73565b6040517f23e30c8b0000000000000000000000000000000000000000000000000000000081525f9073ffffffffffffffffffffffffffffffffffffffff8816906323e30c8b906112a19033908a908a9087908b908b9060040161533c565b6020604051808303815f875af11580156112bd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112e1919061538d565b90507f439148f0bbc682ca079e46d6e2c2f0c1e3b820f1a291b069d8882abf8cf18dd9811461133f576040517f5b62c54800000000000000000000000000000000000000000000000000000000815260048101829052602401610687565b61136d873061134e5f89615012565b73ffffffffffffffffffffffffffffffffffffffff8a1692919061304c565b5060019695505050505050565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201525f9073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa1580156113e4573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610352919061538d565b5f611411612450565b61141e6020850185614534565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146114b0573361145e6020860186614534565b6040517f4702b91400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff928316600482015291166024820152604401610687565b5f6114c26114bd866153a4565b6124c1565b5f818152600160205260409020549091507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01611593575f8181526001602081905260408083209290925590519092507fa2d7a96afe77c99b6a2d72ca8b4d3c5c88b6466ee34ca74e0955951f449425c89061154390339084908990615528565b60405180910390a16115935f5b60405190808252806020026020018201604052801561158357816020015b606081526020019060019003908161156e5790505b5061158e8587615635565b6132eb565b5061159d60015f55565b9392505050565b6115ac612450565b825f0361160a576040517f40e97a5e00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8616602482015260448101859052606401610687565b6040805133815273ffffffffffffffffffffffffffffffffffffffff87166020820152908101859052606081018490527fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d79060800160405180910390a161168973ffffffffffffffffffffffffffffffffffffffff861633308661304c565b335f90815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff891684528252808320878452909152812080548592906116d0908490615012565b9091555061171990505f5b60405190808252806020026020018201604052801561170e57816020015b60608152602001906001900390816116f95790505b5061158e8385615635565b61172260015f55565b5050505050565b611731612450565b8351855173ffffffffffffffffffffffffffffffffffffffff9182169116036117a15784516040517f227e4ce900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091166004820152602401610687565b83604001518360400135815181106117bb576117bb614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1685606001518460200135815181106117f6576117f6614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff16146118b957846060015183602001358151811061183657611836614e25565b60200260200101515f0151846040015184604001358151811061185b5761185b614e25565b6020908102919091010151516040517ff902523f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff928316600482015291166024820152604401610687565b83604001518360400135815181106118d3576118d3614e25565b60200260200101516020015160ff1685606001518460200135815181106118fc576118fc614e25565b60200260200101516020015160ff161461199f57846060015183602001358151811061192a5761192a614e25565b602002602001015160200151846040015184604001358151811061195057611950614e25565b6020026020010151602001516040517f0f6ce47700000000000000000000000000000000000000000000000000000000815260040161068792919060ff92831681529116602082015260400190565b6040850151805184359081106119b7576119b7614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1684606001518460600135815181106119f2576119f2614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1614611a5557604085015180518435908110611a3057611a30614e25565b60200260200101515f0151846060015184606001358151811061185b5761185b614e25565b604085015180518435908110611a6d57611a6d614e25565b60200260200101516020015160ff168460600151846060013581518110611a9657611a96614e25565b60200260200101516020015160ff1614611ae857604085015180518435908110611ac257611ac2614e25565b602002602001015160200151846060015184606001358151811061195057611950614e25565b5f60015f611af5886124c1565b81526020019081526020015f205403611b72577fb70c12fa453793fa6818ec07c91e74363a47aa6a6829dcd9533937fdf30314f333865f0151611b37886124c1565b6040805173ffffffffffffffffffffffffffffffffffffffff94851681529390921660208401529082015260600160405180910390a1611719565b5f60015f611b7f876124c1565b81526020019081526020015f205403611bc1577fb70c12fa453793fa6818ec07c91e74363a47aa6a6829dcd9533937fdf30314f333855f0151611b37876124c1565b7f692ee69af2843c70772be93470669f3c73e583316a047b6bfefdae5629de37ce33868686604051611bf694939291906156f5565b60405180910390a15f611c1686855f01358660200135885f0151866124f0565b90505f611c3186866040013587606001358a5f0151886124f0565b90505f611c3e83836134dd565b9050611c528160400151825f015185612cbc565b611c658160600151826020015184612cbc565b606081015181515f91611c7791614fff565b90505f82604001518360200151611c8e9190614fff565b90508115611d2e57335f908152600260209081526040822060608d01518051869492938d0135908110611cc357611cc3614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8a6080013581526020019081526020015f205f828254611d289190615012565b90915550505b8015611dca57335f9081526002602052604081206060808c015180518594928d0135908110611d5f57611d5f614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8a60a0013581526020019081526020015f205f828254611dc49190615012565b90915550505b5050604080513381528251602080830191909152830151818301529082015160608083019190915282015160808201527f3f20e55919cca701abb2a40ab72542b25ea7eed63a50f979dd2cd3231e5f488d9060a00160405180910390a1611e30836130b0565b611e39826130b0565b50505061172260015f55565b5f611e4e612450565b611e5b6020850185614f56565b90505f03611e95576040517f6c44ef8f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611ea26040850185614f56565b90505f03611edc576040517f540e5f0b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040805160a081019091523381525f9060208101611efa878061577e565b611f03906157b0565b8152602001868060200190611f189190614f56565b808060200260200160405190810160405280939291908181526020015f905b82821015611f6357611f54606083028601368190038101906157bb565b81526020019060010190611f37565b5050509183525050602001611f7b6040880188614f56565b808060200260200160405190810160405280939291908181526020015f905b82821015611fc657611fb7606083028601368190038101906157bb565b81526020019060010190611f9a565b50505050508152602001866060013581525090505f611fe4826124c1565b5f8181526001602052604090205490915015801561212b575f8281526001602081905260409182902055835190517f3ce8bbe652d8778b67dd565c479c3bbaa843e55e477d075f756f889ec4bbdaee9161204191859087906157d5565b60405180910390a15f61205760a0890189615294565b905011156120f3576120a861206f60a0890189615294565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525061352f92505050565b82517fd46c2c56b35c8210e9e712ec3f02242d5fc90187c0ac8ed80cc33626846ec36990836120da60a08b018b615294565b6040516120ea9493929190615809565b60405180910390a15b604080515f8082526020820190925261212b91612120565b606081526020019060019003908161210b5790505b5061158e8789615635565b9250505061159d60015f55565b604080515f8152602081019091526060908267ffffffffffffffff81111561216257612162614659565b60405190808252806020026020018201604052801561219557816020015b60608152602001906001900390816121805790505b5091505f5b83811015612216576121f1308686848181106121b8576121b8614e25565b90506020028101906121ca9190615294565b856040516020016121dd93929190615855565b604051602081830303815290604052613573565b83828151811061220357612203614e25565b602090810291909101015260010161219a565b505092915050565b612226612450565b61222f5f6116db565b61223860015f55565b5050565b5f80808061225661224d8680614f24565b6114bd906153a4565b5f818152600160208190526040909120549192501461227e575f805f935093509350506122d2565b5f6122bb61228c8780614f24565b612295906153a4565b60208801356040890135336122ad60608c018c614dc1565b6122b69161586a565b6124f0565b905060018160400151826060015194509450945050505b9193909250565b6122e1612450565b825f0361233f576040517ff7a898f600000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8616602482015260448101859052606401610687565b335f90815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff891684528252808320878452909152812054906123828583613598565b90508015612445576123948183614fff565b335f81815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff8d168085529083528184208c855283529281902094909455835192835282015290810187905260608101869052608081018290527febff2602b3f468259e1e99f613fed6691f3a6526effe6ef3e768ba7ae7a36c4f9060a00160405180910390a161243c73ffffffffffffffffffffffffffffffffffffffff88163383612f73565b6124455f611550565b505061172260015f55565b60025f54036124bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610687565b60025f55565b5f816040516020016124d39190615876565b604051602081830303815290604052805190602001209050919050565b6124f861438f565b5f612502876124c1565b60408051600480825260a082019092529192506060915f91816020015b606081526020019060019003908161251f57905050895160408051600381526020810187905273ffffffffffffffffffffffffffffffffffffffff92831681830152918916606083015260808201905290915081600180038151811061258757612587614e25565b6020026020010181905250612712896040015189815181106125ab576125ab614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff168a604001518a815181106125e2576125e2614e25565b60200260200101516020015160ff168b604001518b8151811061260757612607614e25565b60200260200101516040015160025f8e5f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8e604001518e8151811061266a5761266a614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8e604001518e815181106126c5576126c5614e25565b60200260200101516040015181526020019081526020015f20545f60408051600581526020810196909652858101949094526060850192909252608084015260a083015260c08201905290565b8160016003038151811061272857612728614e25565b60200260200101819052506128668960600151888151811061274c5761274c614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff168a60600151898151811061278357612783614e25565b60200260200101516020015160ff168b606001518a815181106127a8576127a8614e25565b60200260200101516040015160025f8e5f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8e606001518d8151811061280b5761280b614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8e606001518d815181106126c5576126c5614e25565b8160016004038151811061287c5761287c614e25565b602002602001018190525061289181866135ad565b9150505f885f015173ffffffffffffffffffffffffffffffffffffffff1690505f808a602001515f015173ffffffffffffffffffffffffffffffffffffffff1663d6e3357a8c60200151602001516128f286305f9182526020526040902090565b60208f0151604001515f8981604051908082528060200260200182016040528015612927578160200160208202803683370190505b506040518763ffffffff1660e01b8152600401612949969594939291906158f1565b5f60405180830381865afa158015612963573d5f803e3d5ffd5b505050506040513d5f823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526129a891908101906159c5565b915091506002825110156129ed5781516040517f3eee395400000000000000000000000000000000000000000000000000000000815260040161068791815260200190565b5f82600181518110612a0157612a01614e25565b602002602001015190505f835f81518110612a1e57612a1e614e25565b602002602001015190505f60025f8f5f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8f606001518e81518110612a8057612a80614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8f606001518e81518110612adb57612adb614e25565b60200260200101516040015181526020019081526020015f205490505f612b318f606001518e81518110612b1157612b11614e25565b60200260200101516020015160ff165f84612bba9092919063ffffffff16565b905080841115612b3f578093505b50506040805160028152602081018490528082018390526060810190915286600281518110612b7057612b70614e25565b6020908102919091018101919091526040805160e0810182529e8f52908e019b909b52998c015260608b019890985250608089019190915260a08801525050505060c08301525090565b5f8260121115612bee5760128390036002831615612be457612bdc85826138b3565b91505061159d565b612bdc858261393e565b6012831115612c37577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee83016001831615612c2d57612bdc8582613975565b612bdc85826139c1565b508261159d565b5f612c538484670de0b6b3a7640000856139e3565b949350505050565b5f8260121115612c7d5760128390036001831615612c2d57612bdc8582613975565b6012831115612c37577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee83016002831615612be457612bdc85826138b3565b828160800151600381518110612cd457612cd4614e25565b6020026020010151600481518110612cee57612cee614e25565b602002602001018181525050818160800151600481518110612d1257612d12614e25565b6020026020010151600481518110612d2c57612d2c614e25565b60209081029190910101528215612e345780515173ffffffffffffffffffffffffffffffffffffffff165f90815260026020526040812060808301518051869391906003908110612d7f57612d7f614e25565b60200260200101515f81518110612d9857612d98614e25565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8360800151600381518110612df157612df1614e25565b6020026020010151600281518110612e0b57612e0b614e25565b602002602001015181526020019081526020015f205f828254612e2e9190615012565b90915550505b8115612f315780515173ffffffffffffffffffffffffffffffffffffffff165f90815260026020526040812060808301518051859391906004908110612e7c57612e7c614e25565b60200260200101515f81518110612e9557612e95614e25565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8360800151600481518110612eee57612eee614e25565b6020026020010151600281518110612f0857612f08614e25565b602002602001015181526020019081526020015f205f828254612f2b9190614fff565b90915550505b7f17a5c0f3785132a57703932032f6863e7920434150aa1dc940e567b440fdce1f338260800151604051612f66929190615a25565b60405180910390a1505050565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526130479084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152613a3e565b505050565b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526130aa9085907f23b872dd0000000000000000000000000000000000000000000000000000000090608401612fc5565b50505050565b60c08101515115613150578051602090810151015160a082015160c08301516040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9093169263946aadc692613122929091600401615a53565b5f604051808303815f87803b158015613139575f80fd5b505af115801561314b573d5f803e3d5ffd5b505050505b805160209081015180519082015160a08401515f9081523090935260408320839273ffffffffffffffffffffffffffffffffffffffff169163d6e3357a918651602001516040015160808801516001905f6040519080825280602002602001820160405280156131ca578160200160208202803683370190505b506040518763ffffffff1660e01b81526004016131ec969594939291906158f1565b5f60405180830381865afa158015613206573d5f803e3d5ffd5b505050506040513d5f823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261324b91908101906159c5565b8051919350915015613047578251602090810151015160a08401516040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9092169163946aadc6916132b9918590600401615a53565b5f604051808303815f87803b1580156132d0575f80fd5b505af11580156132e2573d5f803e3d5ffd5b50505050505050565b3361331d6040805160a0810182525f918101828152606080830193909352608082018390528152602081019190915290565b5f5b83518110156117225783818151811061333a5761333a614e25565b602002602001015191505f80835f01515f015173ffffffffffffffffffffffffffffffffffffffff1663d6e3357a855f01516020015161338388305f9182526020526040902090565b875f0151604001515f61339a8d8b602001516135ad565b604080515f815260208101918290527fffffffff0000000000000000000000000000000000000000000000000000000060e089901b169091526133e5959493929190602481016158f1565b5f60405180830381865afa1580156133ff573d5f803e3d5ffd5b505050506040513d5f823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261344491908101906159c5565b8551602001516040517f946aadc600000000000000000000000000000000000000000000000000000000815292945090925073ffffffffffffffffffffffffffffffffffffffff169063946aadc6906134a39088908590600401615a53565b5f604051808303815f87803b1580156134ba575f80fd5b505af11580156134cc573d5f803e3d5ffd5b50505050505080600101905061331f565b61350460405180608001604052805f81526020015f81526020015f81526020015f81525090565b61350e8383613b4b565b8252604082015261351f8284613b4b565b6020830152606082015292915050565b61353881613c0a565b61357057806040517f644cc2580000000000000000000000000000000000000000000000000000000081526004016106879190615a6b565b50565b606061159d8383604051806060016040528060278152602001615c5a60279139613c38565b5f8183106135a6578161159d565b5090919050565b60605f825167ffffffffffffffff8111156135ca576135ca614659565b6040519080825280602002602001820160405280156135f3578160200160208202803683370190505b5090505f80845111613605575f61360b565b83516001015b85516001010190505f8167ffffffffffffffff81111561362d5761362d614659565b60405190808252806020026020018201604052801561366057816020015b606081526020019060019003908161364b5790505b5090505f613684604080516002815233602082015230818301526060810190915290565b82828151811061369657613696614e25565b60200260200101819052505f5b87518110156136f35781806001019250508781815181106136c6576136c6614e25565b60200260200101518383815181106136e0576136e0614e25565b60209081029190910101526001016136a3565b508551156138a95780806001019150508382828151811061371657613716614e25565b60200260200101819052505f5b86518110156138a7576137d287828151811061374157613741614e25565b60200260200101515f01516137af61377d8a858151811061376457613764614e25565b6020026020010151602001518051602090810291012090565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f908152601c91909152603c902090565b8984815181106137c1576137c1614e25565b602002602001015160400151613cb9565b61380b576040517f52bf984800000000000000000000000000000000000000000000000000000000815260048101829052602401610687565b86818151811061381d5761381d614e25565b60200260200101515f015173ffffffffffffffffffffffffffffffffffffffff1685828151811061385057613850614e25565b602002602001018181525050818060010192505086818151811061387657613876614e25565b60200260200101516020015183838151811061389457613894614e25565b6020908102919091010152600101613723565b505b5095945050505050565b5f604e82106138f15782156138e8577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6138ea565b5f5b9050610352565b50600a81900a828102908381838161390b5761390b615a7d565b0414613937577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff612c53565b5092915050565b600a81900a61394d8184615aaa565b9050604e821061035257821561396d5761396882600a615bdf565b61159d565b505f92915050565b5f604e821061399757821561398b57600161398d565b5f5b60ff169050610352565b600a82900a8084816139ab576139ab615a7d565b0491508082028414613937575060010192915050565b5f604e82101561396d5781600a0a83816139dd576139dd615a7d565b0461159d565b5f806139f0868686613d27565b90506001836002811115613a0657613a06615bea565b148015613a2257505f8480613a1d57613a1d615a7d565b868809115b15613a3557613a32600182615012565b90505b95945050505050565b5f613a9f826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16613e4d9092919063ffffffff16565b905080515f1480613abf575080806020019051810190613abf9190615c17565b613047576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610687565b5f805f613b6c846060015160018660400151612c3e9092919063ffffffff16565b604086015190915081811115613b7f5750805b613bbf865f015160600151876020015181518110613b9f57613b9f614e25565b60200260200101516020015160ff165f83612c5b9092919063ffffffff16565b92505f613bdc8760600151600184612c3e9092919063ffffffff16565b9050613bfe865f015160600151876020015181518110610d8457610d84614e25565b94505050509250929050565b5f600882511015613c1c57505f919050565b506008015167ffffffffffffffff1667ff0a89c674ee78741490565b60605f808573ffffffffffffffffffffffffffffffffffffffff1685604051613c619190615c36565b5f60405180830381855af49150503d805f8114613c99576040519150601f19603f3d011682016040523d82523d5f602084013e613c9e565b606091505b5091509150613caf86838387613e5b565b9695505050505050565b5f805f613cc68585613efa565b90925090505f816004811115613cde57613cde615bea565b148015613d1657508573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b80613caf5750613caf868686613f3c565b5f80807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff858709858702925082811083820303915050805f03613d7d57838281613d7357613d73615a7d565b049250505061159d565b808411613de6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f4d6174683a206d756c446976206f766572666c6f7700000000000000000000006044820152606401610687565b5f8486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091025f889003889004909101858311909403939093029303949094049190911702949350505050565b6060612c5384845f85614094565b60608315613ef05782515f03613ee95773ffffffffffffffffffffffffffffffffffffffff85163b613ee9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610687565b5081612c53565b612c5383836141a9565b5f808251604103613f2e576020830151604084015160608501515f1a613f22878285856141ed565b94509450505050613f35565b505f905060025b9250929050565b5f805f8573ffffffffffffffffffffffffffffffffffffffff16631626ba7e60e01b8686604051602401613f71929190615c41565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909416939093179092529051613ffa9190615c36565b5f60405180830381855afa9150503d805f8114614032576040519150601f19603f3d011682016040523d82523d5f602084013e614037565b606091505b509150915081801561404b57506020815110155b8015613caf575080517f1626ba7e0000000000000000000000000000000000000000000000000000000090614089908301602090810190840161538d565b149695505050505050565b606082471015614126576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610687565b5f808673ffffffffffffffffffffffffffffffffffffffff16858760405161414e9190615c36565b5f6040518083038185875af1925050503d805f8114614188576040519150601f19603f3d011682016040523d82523d5f602084013e61418d565b606091505b509150915061419e87838387613e5b565b979650505050505050565b8151156141b95781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106879190615a6b565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561422257505f905060036142cc565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015614273573d5f803e3d5ffd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81166142c6575f600192509250506142cc565b91505f90505b94509492505050565b60405180608001604052806142e8614301565b81526020015f81526020015f8152602001606081525090565b6040518060a001604052805f73ffffffffffffffffffffffffffffffffffffffff16815260200161437660405180606001604052805f73ffffffffffffffffffffffffffffffffffffffff1681526020015f73ffffffffffffffffffffffffffffffffffffffff168152602001606081525090565b8152606060208201819052604082018190525f91015290565b6040518060e001604052806143a2614301565b81526020015f81526020015f81526020015f8152602001606081526020015f8152602001606081525090565b5f602082840312156143de575f80fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461159d575f80fd5b5f60a0828403121561441d575f80fd5b50919050565b5f60208284031215614433575f80fd5b813567ffffffffffffffff811115614449575f80fd5b612c538482850161440d565b5f60208284031215614465575f80fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff81168114613570575f80fd5b80356144988161446c565b919050565b5f805f805f608086880312156144b1575f80fd5b85356144bc8161446c565b945060208601356144cc8161446c565b935060408601359250606086013567ffffffffffffffff808211156144ef575f80fd5b818801915088601f830112614502575f80fd5b813581811115614510575f80fd5b896020828501011115614521575f80fd5b9699959850939650602001949392505050565b5f60208284031215614544575f80fd5b813561159d8161446c565b5f8083601f84011261455f575f80fd5b50813567ffffffffffffffff811115614576575f80fd5b6020830191508360208260051b8501011115613f35575f80fd5b5f805f604084860312156145a2575f80fd5b833567ffffffffffffffff808211156145b9575f80fd5b6145c58783880161440d565b945060208601359150808211156145da575f80fd5b506145e78682870161454f565b9497909650939450505050565b5f805f805f60808688031215614608575f80fd5b85356146138161446c565b94506020860135935060408601359250606086013567ffffffffffffffff81111561463c575f80fd5b6146488882890161454f565b969995985093965092949392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6040516060810167ffffffffffffffff811182821017156146a9576146a9614659565b60405290565b60405160a0810167ffffffffffffffff811182821017156146a9576146a9614659565b6040805190810167ffffffffffffffff811182821017156146a9576146a9614659565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561473c5761473c614659565b604052919050565b5f82601f830112614753575f80fd5b813567ffffffffffffffff81111561476d5761476d614659565b61479e60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016146f5565b8181528460208386010111156147b2575f80fd5b816020850160208301375f918101602001919091529392505050565b5f606082840312156147de575f80fd5b6147e6614686565b905081356147f38161446c565b815260208201356148038161446c565b6020820152604082013567ffffffffffffffff811115614821575f80fd5b61482d84828501614744565b60408301525092915050565b5f67ffffffffffffffff82111561485257614852614659565b5060051b60200190565b803560ff81168114614498575f80fd5b5f6060828403121561487c575f80fd5b614884614686565b905081356148918161446c565b815261489f6020830161485c565b60208201526040820135604082015292915050565b5f82601f8301126148c3575f80fd5b813560206148d86148d383614839565b6146f5565b8083825260208201915060606020606086028801019450878511156148fb575f80fd5b602087015b8581101561491f57614912898261486c565b8452928401928101614900565b5090979650505050505050565b5f60a0828403121561493c575f80fd5b6149446146af565b905061494f8261448d565b8152602082013567ffffffffffffffff8082111561496b575f80fd5b614977858386016147ce565b6020840152604084013591508082111561498f575f80fd5b61499b858386016148b4565b604084015260608401359150808211156149b3575f80fd5b506149c0848285016148b4565b6060830152506080820135608082015292915050565b5f60c0828403121561441d575f80fd5b5f6149f36148d384614839565b8381529050602080820190600585811b850187811115614a11575f80fd5b855b81811015614afe57803567ffffffffffffffff80821115614a32575f80fd5b908801906060828c031215614a45575f80fd5b614a4d614686565b8235614a588161446c565b81528287013582811115614a6a575f80fd5b8301601f81018d13614a7a575f80fd5b8035614a886148d382614839565b81815290881b8201890190898101908f831115614aa3575f80fd5b928a01925b82841015614ac15783358252928a0192908a0190614aa8565b848b01525060409150508381013583811115614adb575f80fd5b614ae78e828701614744565b918301919091525087525050938301938301614a13565b50505050509392505050565b5f82601f830112614b19575f80fd5b61159d838335602085016149e6565b5f805f805f6101408688031215614b3d575f80fd5b853567ffffffffffffffff80821115614b54575f80fd5b614b6089838a0161492c565b96506020880135915080821115614b75575f80fd5b614b8189838a0161492c565b9550614b908960408a016149d6565b9450610100880135915080821115614ba6575f80fd5b614bb289838a01614b0a565b9350610120880135915080821115614bc8575f80fd5b50614bd588828901614b0a565b9150509295509295909350565b5f805f60408486031215614bf4575f80fd5b833567ffffffffffffffff80821115614c0b575f80fd5b6145c5878388016149d6565b5f8060208385031215614c28575f80fd5b823567ffffffffffffffff811115614c3e575f80fd5b614c4a8582860161454f565b90969095509350505050565b5f81518084528060208401602086015e5f6020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b5f60208083016020845280855180835260408601915060408160051b8701019250602087015f5b82811015614d15577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0888603018452614d03858351614c56565b94509285019290850190600101614cc9565b5092979650505050505050565b5f805f60608486031215614d34575f80fd5b8335614d3f8161446c565b92506020840135614d4f8161446c565b929592945050506040919091013590565b5f8060408385031215614d71575f80fd5b8235614d7c8161446c565b946020939093013593505050565b5f60208284031215614d9a575f80fd5b813567ffffffffffffffff811115614db0575f80fd5b82016080818503121561159d575f80fd5b5f8083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112614df4575f80fd5b83018035915067ffffffffffffffff821115614e0e575f80fd5b6020019150600581901b3603821315613f35575f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b5f82357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81833603018112614e84575f80fd5b9190910192915050565b5f60808236031215614e9e575f80fd5b6040516080810167ffffffffffffffff8282108183111715614ec257614ec2614659565b816040528435915080821115614ed6575f80fd5b614ee23683870161492c565b835260208501356020840152604085013560408401526060850135915080821115614f0b575f80fd5b50614f1836828601614b0a565b60608301525092915050565b5f82357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61833603018112614e84575f80fd5b5f8083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112614f89575f80fd5b83018035915067ffffffffffffffff821115614fa3575f80fd5b6020019150606081023603821315613f35575f80fd5b5f60208284031215614fc9575f80fd5b61159d8261485c565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b8181038181111561035257610352614fd2565b8082018082111561035257610352614fd2565b5f815180845260208085019450602084015f5b83811015615083578151805173ffffffffffffffffffffffffffffffffffffffff1688528381015160ff16848901526040908101519088015260609096019590820190600101615038565b509495945050505050565b5f73ffffffffffffffffffffffffffffffffffffffff808351168452602083015160a060208601528181511660a08601528160208201511660c08601526040810151915050606060e08501526150e8610100850182614c56565b9050604083015184820360408601526151018282615025565b9150506060830151848203606086015261511b8282615025565b915050608083015160808501528091505092915050565b5f815180845260208085019450602084015f5b8381101561508357815187529582019590820190600101615145565b5f73ffffffffffffffffffffffffffffffffffffffff80871683526020608081850152865160808086015261519a61010086018261508e565b90508188015160a086015260408089015160c08701526060808a01517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff808885030160e08901528381518086528686019150868160051b87010187840193505f5b82811015615272577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe088830301845284518a815116835289810151878b85015261524688850182615132565b91890151848303858b015291905061525e8183614c56565b968b0196958b0195935050506001016151fa565b5080995050505050505050505083604083015282606083015295945050505050565b5f8083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126152c7575f80fd5b83018035915067ffffffffffffffff8211156152e1575f80fd5b602001915036819003821315613f35575f80fd5b81835281816020850137505f602082840101525f60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b5f73ffffffffffffffffffffffffffffffffffffffff808916835280881660208401525085604083015284606083015260a0608083015261538160a0830184866152f5565b98975050505050505050565b5f6020828403121561539d575f80fd5b5051919050565b5f610352368361492c565b5f81356153bb8161446c565b73ffffffffffffffffffffffffffffffffffffffff90811684526020830135906153e48261446c565b1660208401526040820135368390037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe101811261541f575f80fd5b820160208101903567ffffffffffffffff81111561543b575f80fd5b803603821315615449575f80fd5b60606040860152613a356060860182846152f5565b5f8083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112615491575f80fd5b830160208101925035905067ffffffffffffffff8111156154b0575f80fd5b606081023603821315613f35575f80fd5b8183525f60208085019450825f5b858110156150835781356154e28161446c565b73ffffffffffffffffffffffffffffffffffffffff16875260ff61550783850161485c565b168784015260408281013590880152606096870196909101906001016154cf565b5f73ffffffffffffffffffffffffffffffffffffffff808616835284602084015260606040840152833561555b8161446c565b1660608301526020830135368490037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa1018112615596575f80fd5b60a060808401526155ad61010084018583016153af565b90506155bc604085018561545e565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa0808685030160a08701526155f28483856154c1565b9350615601606088018861545e565b93509150808685030160c08701525061561b8383836154c1565b92505050608084013560e084015280915050949350505050565b5f6156426148d384614839565b80848252602080830192508560051b85013681111561565f575f80fd5b855b818110156156e957803567ffffffffffffffff80821115615680575f80fd5b818901915060408236031215615694575f80fd5b61569c6146d2565b8235828111156156aa575f80fd5b6156b6368286016147ce565b82525085830135828111156156c9575f80fd5b6156d536828601614b0a565b828801525087525050938201938201615661565b50919695505050505050565b5f61012073ffffffffffffffffffffffffffffffffffffffff871683528060208401526157248184018761508e565b90508281036040840152615738818661508e565b9150508235606083015260208301356080830152604083013560a0830152606083013560c0830152608083013560e083015260a083013561010083015295945050505050565b5f82357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa1833603018112614e84575f80fd5b5f61035236836147ce565b5f606082840312156157cb575f80fd5b61159d838361486c565b73ffffffffffffffffffffffffffffffffffffffff84168152826020820152606060408201525f613a35606083018461508e565b73ffffffffffffffffffffffffffffffffffffffff85168152836020820152606060408201525f613caf6060830184866152f5565b5f81518060208401855e5f93019283525090919050565b828482375f8382015f8152613caf818561583e565b5f61159d3684846149e6565b602081525f61159d602083018461508e565b5f8282518085526020808601955060208260051b840101602086015f5b8481101561491f577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08684030189526158df838351615132565b988401989250908301906001016158a5565b73ffffffffffffffffffffffffffffffffffffffff8716815285602082015260c060408201525f61592560c0830187614c56565b856060840152828103608084015261593d8186615888565b905082810360a08401526159518185615132565b9998505050505050505050565b5f82601f83011261596d575f80fd5b8151602061597d6148d383614839565b8083825260208201915060208460051b87010193508684111561599e575f80fd5b602086015b848110156159ba57805183529183019183016159a3565b509695505050505050565b5f80604083850312156159d6575f80fd5b825167ffffffffffffffff808211156159ed575f80fd5b6159f98683870161595e565b93506020850151915080821115615a0e575f80fd5b50615a1b8582860161595e565b9150509250929050565b73ffffffffffffffffffffffffffffffffffffffff83168152604060208201525f612c536040830184615888565b828152604060208201525f612c536040830184615132565b602081525f61159d6020830184614c56565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b808202811582820484141761035257610352614fd2565b600181815b80851115615b1a57817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115615b0057615b00614fd2565b80851615615b0d57918102915b93841c9390800290615ac6565b509250929050565b5f82615b3057506001610352565b81615b3c57505f610352565b8160018114615b525760028114615b5c57615b78565b6001915050610352565b60ff841115615b6d57615b6d614fd2565b50506001821b610352565b5060208310610133831016604e8410600b8410161715615b9b575081810a610352565b615ba58383615ac1565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115615bd757615bd7614fd2565b029392505050565b5f61159d8383615b22565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602160045260245ffd5b5f60208284031215615c27575f80fd5b8151801515811461159d575f80fd5b5f61159d828461583e565b828152604060208201525f612c536040830184614c5656fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564',
		sourceMap:
			'7951:35757:375:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1450:207:368;;;;;;:::i;:::-;;:::i;:::-;;;516:14:558;;509:22;491:41;;479:2;464:18;1450:207:368;;;;;;;;15087:10268:375;;;;;;:::i;:::-;;:::i;:::-;;;;1273:25:558;;;1329:2;1314:18;;1307:34;;;;1246:18;15087:10268:375;1099:248:558;9724:134:375;;;;;;:::i;:::-;9796:4;9819:18;;;4418:1;9819:18;;;;;;;;;:32;;9724:134;1703:1578:368;;;;;;:::i;:::-;;:::i;3722:140::-;;;;;;:::i;:::-;;:::i;:::-;;;3320:25:558;;;3308:2;3293:18;3722:140:368;3174:177:558;13649:567:375;;;;;;:::i;:::-;;:::i;10061:723::-;;;;;;:::i;:::-;;:::i;:::-;;25394:4501;;;;;;:::i;:::-;;:::i;11909:1701::-;;;;;;:::i;:::-;;:::i;1207:484:310:-;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;9897:125:375:-;;;;;;:::i;:::-;;:::i;9514:171::-;;;;;;:::i;:::-;9641:21;;;;9615:7;9641:21;;;:14;:21;;;;;;;;:28;;;;;;;;;;;;:37;;;;;;;;9514:171;3327:110:368;;;;;;:::i;:::-;3395:7;3327:110;;;;;14255:605:375;;;;;;:::i;:::-;;:::i;:::-;;;;18459:14:558;;18452:22;18434:41;;18506:2;18491:18;;18484:34;;;;18534:18;;;18527:34;18422:2;18407:18;14255:605:375;18238:329:558;10823:1047:375;;;;;;:::i;:::-;;:::i;1450:207:368:-;1535:4;1558:52;;;1573:37;1558:52;;:92;;-1:-1:-1;952:25:314;937:40;;;;1614:36:368;1551:99;1450:207;-1:-1:-1;;1450:207:368:o;15087:10268:375:-;15199:23;15224:24;2261:21:301;:19;:21::i;:::-;15268:13:375::1;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;:20;;15292:1;15268:25:::0;15264:73:::1;;15316:10;;;;;;;;;;;;;;15264:73;15347:40;;:::i;:::-;15397:20;;:::i;:::-;15845:57;15926:14;15943:13;::::0;;::::1;:6:::0;:13:::1;:::i;:::-;16037:4;16031:11:::0;;16152:4:::1;16148:1;16136:14:::0;;;::::1;16132:25:::0;::::1;16123:35:::0;::::1;16110:49:::0;;;16031:11;-1:-1:-1;16237:19:375;::::1;;::::0;-1:-1:-1;;;16274:24:375;;;16270:88:::1;;16325:18;;;;;;;;;;;;;;16270:88;16371:9;16398:7033;16409:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;:20;;16405:1;:24;:51;;;;;16455:1;16433:19;:23;16405:51;16398:7033;;;16494:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;16508:1;16494:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;16476:34;;;:::i;:::-;16536:21:::0;;16476:34;;-1:-1:-1;16536:21:375;-1:-1:-1;16740:13:375::1;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;16754:1;16740:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:34;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;16775:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;16789:1;16775:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:29;;;16740:65;;;;;;;:::i;:::-;:71;::::0;::::1;:65;::::0;;::::1;;:71:::0;;::::1;::::0;-1:-1:-1;16740:71:375::1;:::i;:::-;16659:152;;:5;:17;;;16677:15;:28;;;16659:47;;;;;;;;:::i;:::-;;;;;;;:53;;;:152;;;16634:455;;16898:5;:17;;;16916:15;:28;;;16898:47;;;;;;;;:::i;:::-;;::::0;;::::1;::::0;;;;;;:53;16977:13:::1;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;16991:1;16977:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:34;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;17012:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;17026:1;17012:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:29;;;16977:65;;;;;;;:::i;:::-;:71;::::0;::::1;:65;::::0;;::::1;;:71:::0;;::::1;::::0;-1:-1:-1;16977:71:375::1;:::i;:::-;16859:211;::::0;::::1;::::0;;21992:42:558;22061:15;;;16859:211:375::1;::::0;::::1;22043:34:558::0;22113:15;;22093:18;;;22086:43;21955:18;;16859:211:375::1;;;;;;;;16634:455;17274:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;17288:1;17274:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:35;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;17310:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;17324:1;17310:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:30;;;17274:67;;;;;;;:::i;:::-;:73;::::0;::::1;:67;::::0;;::::1;;:73:::0;;::::1;::::0;-1:-1:-1;17274:73:375::1;:::i;:::-;17191:156;;:5;:18;;;17210:15;:29;;;17191:49;;;;;;;;:::i;:::-;;;;;;;:55;;;:156;;;17166:463;;17434:5;:18;;;17453:15;:29;;;17434:49;;;;;;;;:::i;:::-;;::::0;;::::1;::::0;;;;;;:55;17515:13:::1;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;17529:1;17515:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:35;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;17551:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;17565:1;17551:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:30;;;17515:67;;;;;;;:::i;17166:463::-;17823:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;17837:1;17823:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:34;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;17858:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;17872:1;17858:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:29;;;17823:65;;;;;;;:::i;:::-;;;;;;:74;;;;;;;;;;:::i;:::-;17739:158;;:5;:17;;;17757:15;:28;;;17739:47;;;;;;;;:::i;:::-;;;;;;;:56;;;:158;;;17714:475;;17992:5;:17;;;18010:15;:28;;;17992:47;;;;;;;;:::i;:::-;;;;;;;:56;;;18074:6;:13;;;;;;;;:::i;:::-;18088:1;18074:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:34;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;18109:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;18123:1;18109:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:29;;;18074:65;;;;;;;:::i;:::-;;;;;;:74;;;;;;;;;;:::i;:::-;17945:225;::::0;::::1;::::0;;22523:4:558;22511:17;;;17945:225:375::1;::::0;::::1;22493:36:558::0;22565:17;;22545:18;;;22538:45;22466:18;;17945:225:375::1;22327:262:558::0;17714:475:375::1;18386:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;18400:1;18386:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:35;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;18422:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;18436:1;18422:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:30;;;18386:67;;;;;;;:::i;:::-;;;;;;:76;;;;;;;;;;:::i;:::-;18300:162;;:5;:18;;;18319:15;:29;;;18300:49;;;;;;;;:::i;:::-;;;;;;;:58;;;:162;;;18275:483;;18557:5;:18;;;18576:15;:29;;;18557:49;;;;;;;;:::i;:::-;;;;;;;:58;;;18641:6;:13;;;;;;;;:::i;:::-;18655:1;18641:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:35;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;18677:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;18691:1;18677:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:30;;;18641:67;;;;;;;:::i;18275:483::-;18776:17;18796:12;:5;:10;:12::i;:::-;4622:1;18830:18:::0;;;:7:::1;:18;::::0;;;;;18776:32;;-1:-1:-1;18826:4519:375::1;;18917:11:::0;;18891:49:::1;::::0;;18905:10:::1;22857:34:558::0;;22806:42;22927:15;;;22922:2;22907:18;;22900:43;22959:18;;22952:34;;;18891:49:375::1;::::0;22784:2:558;22769:18;18891:49:375::1;;;;;;;18826:4519;;;18987:46;19036:269;19078:5;19109:15;:28;;;19163:15;:29;;;19218:10;19254:15;:29;;;19036:16;:269::i;:::-;18987:318;;19704:6;:21;;;19675:18;:26;;;:50;19671:3656;;;19791:11:::0;;19758:56:::1;::::0;;19779:10:::1;22857:34:558::0;;22806:42;22927:15;;;22922:2;22907:18;;22900:43;22959:18;;22952:34;;;19758:56:375::1;::::0;22784:2:558;22769:18;19758:56:375::1;;;;;;;;19671:3656;;;19869:18;:28;;;19902:1;19847:56:::0;19843:3484:::1;;19964:11:::0;;19936:51:::1;::::0;;19952:10:::1;22857:34:558::0;;22806:42;22927:15;;;22922:2;22907:18;;22900:43;22959:18;;22952:34;;;19936:51:375::1;::::0;22784:2:558;22769:18;19936:51:375::1;22594:398:558::0;19843:3484:375::1;20042:24;20069:5;:18;;;20088:15;:29;;;20069:49;;;;;;;;:::i;:::-;;::::0;;::::1;::::0;;;;;;;:58:::1;::::0;20330:28:::1;::::0;::::1;::::0;20069:58;;-1:-1:-1;20232:26:375::1;20909:62;:19:::0;:62:::1;::::0;::::1;503:6:54;20909:27:375;:62::i;:::-;20820:152;;21064:21;21027:12;21006:80;21002:187;;;21137:21;21122:36;;21002:187;20681:534;21241:19;21403:28:::0;21615:164:::1;21701:18;:26;;;21729:16;21636:12;21615:48;;:164;;;;;:::i;:::-;21403:406;;21853:178;21930:5;:17;;;21948:15;:28;;;21930:47;;;;;;;;:::i;:::-;;;;;;;:56;;;21853:178;;416:1:54;21875:13:375;21853:43;;:178;;;;;:::i;:::-;21839:192:::0;-1:-1:-1;22084:18:375::1;::::0;-1:-1:-1;22133:76:375::1;22154:12:::0;22133:76:::1;::::0;::::1;503:6:54;22133:41:375;:76::i;:::-;22084:125:::0;-1:-1:-1;22236:33:375::1;22084:125:::0;22236:33;::::1;:::i;:::-;::::0;-1:-1:-1;22295:31:375::1;22315:11:::0;22295:31;::::1;:::i;:::-;;;22353:58;22367:11;22380:10;22392:18;22353:13;:58::i;:::-;22442:65;22454:10;22466:15;22483:10;22495:11;22442:65;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1::0;;22977:34:375;;23013:1:::1;22973:42;23044:46:::0;;;23252:4:::1;23237:20;23204:54:::0;::::1;23197:82:::0;;;-1:-1:-1;;19843:3484:375::1;18965:4380;18826:4519;-1:-1:-1::0;23395:3:375::1;;16398:7033;;;23462:41;23484:19:::0;23462::::1;::::0;::::1;;:41;:::i;:::-;23444:59:::0;-1:-1:-1;;;23546:19:375;::::1;23528:37:::0;::::1;23524:125;;;23588:50;::::0;::::1;::::0;;23601:19;::::1;23588:50;::::0;::::1;1273:25:558::0;1314:18;;;1307:34;;;1246:18;;23588:50:375::1;1099:248:558::0;23524:125:375::1;24336:19:::0;;24332:203:::1;;24371:153;24483:10;24495:15:::0;24378:13:::1;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;24392:1;24378:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:35;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;24414:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;24428:1;24414:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:30;;;24378:67;;;;;;;:::i;:::-;:73;::::0;::::1;:67;::::0;;::::1;;:73:::0;;::::1;::::0;-1:-1:-1;24378:73:375::1;:::i;:::-;24371:94;;::::0;:153;:94:::1;:153::i;:::-;24570:1;24549:11;;::::0;::::1;:6:::0;:11:::1;:::i;:::-;:18;;:22;24545:390;;;24610:10;24587:47;24652:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;24666:1;24652:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:35;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;24688:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;24702:1;24688:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:30;;;24652:67;;;;;;;:::i;:::-;:73;::::0;::::1;:67;::::0;;::::1;;:73:::0;;::::1;::::0;-1:-1:-1;24652:73:375::1;:::i;:::-;24743:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;24757:1;24743:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:34;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;24778:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;24792:1;24778:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:29;;;24743:65;;;;;;;:::i;:::-;:71;::::0;::::1;:65;::::0;;::::1;;:71:::0;;::::1;::::0;-1:-1:-1;24743:71:375::1;:::i;:::-;24832:15:::0;24865:16;24899:11:::1;;::::0;::::1;:6:::0;:11:::1;:::i;:::-;24587:337;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;::::0;::::1;;;;;;;;;24545:390;24949:20:::0;;24945:222:::1;;24985:171;25099:10;25119:4;25126:16:::0;24992:13:::1;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;25006:1;24992:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:22;::::0;;::::1;:::i;:::-;:34;::::0;::::1;::::0;::::1;::::0;::::1;:::i;:::-;25027:13;;::::0;::::1;:6:::0;:13:::1;:::i;:::-;25041:1;25027:16;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;:29;;;24992:65;;;;;;;:::i;:::-;:71;::::0;::::1;:65;::::0;;::::1;;:71:::0;;::::1;::::0;-1:-1:-1;24992:71:375::1;:::i;:::-;24985:96;;::::0;:171;;:96:::1;:171::i;:::-;25206:9;25201:138;25225:27;:34;25221:1;:38;25201:138;;;25284:40;25293:27;25321:1;25293:30;;;;;;;;:::i;:::-;;;;;;;25284:8;:40::i;:::-;25261:3;;25201:138;;;;15254:10101;;;2303:20:301::0;1716:1;2809:7;:22;2629:209;2303:20;15087:10268:375;;;:::o;1703:1578:368:-;1857:4;1877:53;:26;;;1912:8;1923:6;1877:26;:53::i;:::-;1958:64;;;;;1941:14;;1958:20;;;;;;:64;;1979:10;;1991:5;;1998:6;;1941:14;;2017:4;;;;1958:64;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;1941:81;;425:45:351;2036:6:368;:40;2032:111;;2099:33;;;;;;;;3320:25:558;;;3293:18;;2099:33:368;3174:177:558;2032:111:368;3168:84;3207:8;3226:4;3233:18;1054:1;3233:6;:18;:::i;:::-;3168:30;;;;:84;;:30;:84::i;:::-;-1:-1:-1;3270:4:368;;1703:1578;-1:-1:-1;;;;;;1703:1578:368:o;3722:140::-;3817:38;;;;;3849:4;3817:38;;;29641:74:558;3791:7:368;;3817:23;;;;;;29614:18:558;;3817:38:368;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;13649:567:375:-;13776:17;2261:21:301;:19;:21::i;:::-;13827:11:375::1;;::::0;::::1;:5:::0;:11:::1;:::i;:::-;13813:25;;:10;:25;;;13809:101;;13875:10;13887:11;;::::0;::::1;:5:::0;:11:::1;:::i;:::-;13861:38;::::0;::::1;::::0;;21992:42:558;22061:15;;;13861:38:375::1;::::0;::::1;22043:34:558::0;22113:15;;22093:18;;;22086:43;21955:18;;13861:38:375::1;21808:327:558::0;13809:101:375::1;13919:17;13939:12;:10;:5:::0;:10:::1;:::i;:::-;;:12::i;:::-;13965:18;::::0;;;4418:1:::1;13965:18;::::0;;;;;13919:32;;-1:-1:-1;13965:32:375;;13961:249:::1;;4622:1;14046:18:::0;;;14028:4:::1;14046:18;::::0;;;;;;;:31;;;;14096:43;;14028:4;;-1:-1:-1;14096:43:375::1;::::0;::::1;::::0;14110:10:::1;::::0;14054:9;;14133:5;;14096:43:::1;:::i;:::-;;;;;;;;14154:45;14190:1;14174:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1::0;14154:45:375::1;14194:4:::0;;14154:45:::1;:::i;:::-;:19;:45::i;:::-;13799:417;2303:20:301::0;1716:1;2809:7;:22;2629:209;2303:20;13649:567:375;;;;;:::o;10061:723::-;2261:21:301;:19;:21::i;:::-;10189:6:375::1;10199:1;10189:11:::0;10185:94:::1;;10223:45;::::0;::::1;::::0;;10241:10:::1;10223:45;::::0;::::1;22857:34:558::0;22806:42;22927:15;;22907:18;;;22900:43;22959:18;;;22952:34;;;22769:18;;10223:45:375::1;22594:398:558::0;10185:94:375::1;10487:43;::::0;;10495:10:::1;36376:34:558::0;;36325:42;36446:15;;36441:2;36426:18;;36419:43;36478:18;;;36471:34;;;36536:2;36521:18;;36514:34;;;10487:43:375::1;::::0;36302:3:558;36287:19;10487:43:375::1;;;;;;;10594:65;:30;::::0;::::1;10625:10;10645:4;10652:6:::0;10594:30:::1;:65::i;:::-;10684:10;10669:26;::::0;;;:14:::1;:26;::::0;;;;;;;::::1;:33:::0;::::1;::::0;;;;;;;:42;;;;;;;;:52;;10715:6;;10669:26;:52:::1;::::0;10715:6;;10669:52:::1;:::i;:::-;::::0;;;-1:-1:-1;10732:45:375::1;::::0;-1:-1:-1;10768:1:375::1;10752:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1::0;10732:45:375::1;10772:4:::0;;10732:45:::1;:::i;:::-;2303:20:301::0;1716:1;2809:7;:22;2629:209;2303:20;10061:723:375;;;;;:::o;25394:4501::-;2261:21:301;:19;:21::i;:::-;25700:14:375;;25680:16;;:34:::1;::::0;;::::1;::::0;::::1;::::0;25676:107:::1;;25751:16:::0;;25741:27:::1;::::0;::::1;::::0;;29671:42:558;29659:55;;;25741:27:375::1;::::0;::::1;29641:74:558::0;29614:18;;25741:27:375::1;29495:226:558::0;25676:107:375::1;25902:8;:20;;;25923:11;:27;;;25902:49;;;;;;;;:::i;:::-;;;;;;;:55;;;25817:140;;:10;:23;;;25841:11;:30;;;25817:55;;;;;;;;:::i;:::-;;;;;;;:61;;;:140;;;25796:407;;26032:10;:23;;;26056:11;:30;;;26032:55;;;;;;;;:::i;:::-;;;;;;;:61;;;26115:8;:20;;;26136:11;:27;;;26115:49;;;;;;;;:::i;:::-;;::::0;;::::1;::::0;;;;;;:55;25997:191:::1;::::0;::::1;::::0;;21992:42:558;22061:15;;;25997:191:375::1;::::0;::::1;22043:34:558::0;22113:15;;22093:18;;;22086:43;21955:18;;25997:191:375::1;21808:327:558::0;25796:407:375::1;26326:8;:20;;;26347:11;:27;;;26326:49;;;;;;;;:::i;:::-;;;;;;;:58;;;26238:146;;:10;:23;;;26262:11;:30;;;26238:55;;;;;;;;:::i;:::-;;;;;;;:64;;;:146;;;26217:427;;26467:10;:23;;;26491:11;:30;;;26467:55;;;;;;;;:::i;:::-;;;;;;;:64;;;26553:8;:20;;;26574:11;:27;;;26553:49;;;;;;;;:::i;:::-;;;;;;;:58;;;26424:205;;;;;;;;;;;22523:4:558::0;22511:17;;;22493:36;;22565:17;;22560:2;22545:18;;22538:45;22481:2;22466:18;;22327:262;26217:427:375::1;26760:22;::::0;::::1;::::0;:53;;26783:29;::::1;::::0;26760:53;::::1;;;;;:::i;:::-;;;;;;;:59;;;26679:140;;:8;:21;;;26701:11;:28;;;26679:51;;;;;;;;:::i;:::-;;;;;;;:57;;;:140;;;26658:407;;26894:22;::::0;::::1;::::0;:53;;26917:29;::::1;::::0;26894:53;::::1;;;;;:::i;:::-;;;;;;;:59;;;26975:8;:21;;;26997:11;:28;;;26975:51;;;;;;;;:::i;26658:407::-;27184:22;::::0;::::1;::::0;:53;;27207:29;::::1;::::0;27184:53;::::1;;;;;:::i;:::-;;;;;;;:62;;;27100:146;;:8;:21;;;27122:11;:28;;;27100:51;;;;;;;;:::i;:::-;;;;;;;:60;;;:146;;;27079:427;;27329:22;::::0;::::1;::::0;:53;;27352:29;::::1;::::0;27329:53;::::1;;;;;:::i;:::-;;;;;;;:62;;;27413:8;:21;;;27435:11;:28;;;27413:51;;;;;;;;:::i;27079:427::-;4622:1;27731:7;:26;27739:17;:10;:15;:17::i;:::-;27731:26;;;;;;;;;;;;:40:::0;27727:170:::1;;27796:62;27810:10;27822;:16;;;27840:17;:10;:15;:17::i;:::-;27796:62;::::0;;22806:42:558;22875:15;;;22857:34;;22927:15;;;;22922:2;22907:18;;22900:43;22959:18;;;22952:34;22784:2;22769:18;27796:62:375::1;;;;;;;27876:7;;27727:170;4622:1;27914:7;:24;27922:15;:8;:13;:15::i;:::-;27914:24;;;;;;;;;;;;:38:::0;27910:164:::1;;27977:58;27991:10;28003:8;:14;;;28019:15;:8;:13;:15::i;27910:164::-;28145:54;28153:10;28165;28177:8;28187:11;28145:54;;;;;;;;;:::i;:::-;;;;;;;;28219:51;28273:147;28303:10;28315:11;:29;;;28346:11;:30;;;28378:8;:14;;;28394:16;28273;:147::i;:::-;28219:201;;28430:49;28482:145;28512:8;28522:11;:27;;;28551:11;:28;;;28581:10;:16;;;28599:18;28482:16;:145::i;:::-;28430:197;;28637:40;28692:73;28718:23;28743:21;28692:25;:73::i;:::-;28637:128;;28776:97;28790:16;:27;;;28819:16;:28;;;28849:23;28776:13;:97::i;:::-;28883:91;28897:16;:25;;;28924:16;:26;;;28952:21;28883:13;:91::i;:::-;29184:25;::::0;::::1;::::0;29153:28;;29131:19:::1;::::0;29153:56:::1;::::0;::::1;:::i;:::-;29131:78;;29223:17;29272:16;:27;;;29243:16;:26;;;:56;;;;:::i;:::-;29223:76:::0;-1:-1:-1;29317:15:375;;29313:211:::1;;29367:10;29352:26;::::0;;;:14:::1;:26;::::0;;;;;;29379:23:::1;::::0;::::1;::::0;:55;;29498:11;;29352:26;;29403:30;::::1;;::::0;29379:55;::::1;;;;;:::i;:::-;;;;;;;:61;;;29352:89;;;;;;;;;;;;;;;:142;29442:11;:51;;;29352:142;;;;;;;;;;;;:157;;;;;;;:::i;:::-;::::0;;;-1:-1:-1;;29313:211:375::1;29541:13:::0;;29537:201:::1;;29589:10;29574:26;::::0;;;:14:::1;:26;::::0;;;;29601:21:::1;::::0;;::::1;::::0;:51;;29714:9;;29574:26;29623:28;::::1;;::::0;29601:51;::::1;;;;;:::i;:::-;;;;;;;:57;;;29574:85;;;;;;;;;;;;;;;:136;29660:11;:49;;;29574:136;;;;;;;;;;;;:149;;;;;;;:::i;:::-;::::0;;;-1:-1:-1;;29537:201:375::1;-1:-1:-1::0;;29763:40:375::1;::::0;;29774:10:::1;37898:74:558::0;;38008:13;;38003:2;37988:18;;;37981:41;;;;38064:15;;38058:22;38038:18;;;38031:50;38123:15;;;38117:22;38112:2;38097:18;;;38090:50;;;;38183:15;;38177:22;38171:3;38156:19;;38149:51;29763:40:375::1;::::0;37885:3:558;37870:19;29763:40:375::1;;;;;;;29814:33;29823:23;29814:8;:33::i;:::-;29857:31;29866:21;29857:8;:31::i;:::-;25652:4243;;;2303:20:301::0;1716:1;2809:7;:22;2629:209;11909:1701:375;12045:4;2261:21:301;:19;:21::i;:::-;12069:23:375::1;;::::0;::::1;:11:::0;:23:::1;:::i;:::-;:30;;12103:1;12069:35:::0;12065:88:::1;;12127:15;;;;;;;;;;;;;;12065:88;12166:24;;::::0;::::1;:11:::0;:24:::1;:::i;:::-;:31;;12201:1;12166:36:::0;12162:90:::1;;12225:16;;;;;;;;;;;;;;12162:90;12462:134;::::0;;::::1;::::0;::::1;::::0;;;12483:10:::1;12462:134:::0;;12439:20:::1;::::0;12462:134:::1;::::0;::::1;12495:21;:11:::0;;:21:::1;:::i;:::-;12462:134;;;:::i;:::-;;;;;12518:11;:23;;;;;;;;:::i;:::-;12462:134;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;::::0;::::1;;::::0;;::::1;::::0;::::1;::::0;::::1;:::i;:::-;;;;;;;;;;;;-1:-1:-1::0;;;12462:134:375;;;-1:-1:-1;;12462:134:375::1;;12543:24;;::::0;::::1;:11:::0;:24:::1;:::i;:::-;12462:134;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;::::0;::::1;;::::0;;::::1;::::0;::::1;::::0;::::1;:::i;:::-;;;;;;;;;;;;;;;;;;;;;12569:11;:17;;;12462:134;;::::0;12439:157:::1;;12606:17;12626:12;:5;:10;:12::i;:::-;12649:16;12668:18:::0;;;:7:::1;:18;::::0;;;;;12606:32;;-1:-1:-1;12668:32:375;12786:789;::::1;;;13063:18;::::0;;;4418:1:::1;13063:18;::::0;;;;;;;;:31;13124:11;;13113:41;;::::1;::::0;::::1;::::0;13071:9;;13124:5;;13113:41:::1;:::i;:::-;;;;;;;;13351:1;13325:16;;::::0;::::1;:11:::0;:16:::1;:::i;:::-;:23;;:27;13321:184;;;13372:45;13400:16;;::::0;::::1;:11:::0;:16:::1;:::i;:::-;13372:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;::::0;;;;-1:-1:-1;13372:27:375::1;::::0;-1:-1:-1;;;13372:45:375:i:1;:::-;13449:11:::0;;13440:50:::1;::::0;13462:9;13473:16:::1;;::::0;::::1;:11:::0;:16:::1;:::i;:::-;13440:50;;;;;;;;;:::i;:::-;;;;;;;;13321:184;13539:18;::::0;;13555:1:::1;13539:18:::0;;;::::1;::::0;::::1;::::0;;;13519:45:::1;::::0;13539:18:::1;::::0;::::1;;;;;;;;;;;;;;;;;-1:-1:-1::0;13519:45:375::1;13559:4:::0;;13519:45:::1;:::i;:::-;13592:11:::0;-1:-1:-1;;;2303:20:301;1716:1;2809:7;:22;2629:209;1207:484:310;1373:12;;;1309:20;1373:12;;;;;;;;1275:22;;1484:4;1472:24;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1462:34;;1511:9;1506:155;1526:15;;;1506:155;;;1575:75;1612:4;1632;;1637:1;1632:7;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;1641;1619:30;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;1575:28;:75::i;:::-;1562:7;1570:1;1562:10;;;;;;;;:::i;:::-;;;;;;;;;;:88;1543:3;;1506:155;;;;1670:14;1207:484;;;;:::o;9897:125:375:-;2261:21:301;:19;:21::i;:::-;9970:45:375::1;10006:1;9990:18;::::0;9970:45:::1;2303:20:301::0;1716:1;2809:7;:22;2629:209;2303:20;9897:125:375;;:::o;14255:605::-;14321:4;;;;14375:24;:17;:11;;:17;:::i;:::-;:22;;;:::i;:24::-;14414:18;;;;4418:1;14414:18;;;;;;;;;14355:44;;-1:-1:-1;14414:32:375;14410:83;;14470:5;14477:1;14480;14462:20;;;;;;;;;14410:83;14503:46;14552:197;14582:17;:11;;:17;:::i;:::-;14552:197;;;:::i;:::-;14613:24;;;;14651:25;;;;14690:10;14714:25;;;;14613:11;14714:25;:::i;:::-;14552:197;;;:::i;:::-;:16;:197::i;:::-;14503:246;;14767:4;14795:18;:28;;;14826:18;:26;;;14759:94;;;;;;;;14255:605;;;;;;:::o;10823:1047::-;2261:21:301;:19;:21::i;:::-;10978:12:375::1;10994:1;10978:17:::0;10974:107:::1;;11018:52;::::0;::::1;::::0;;11043:10:::1;11018:52;::::0;::::1;22857:34:558::0;22806:42;22927:15;;22907:18;;;22900:43;22959:18;;;22952:34;;;22769:18;;11018:52:375::1;22594:398:558::0;10974:107:375::1;11135:10;11090:27;11120:26:::0;;;:14:::1;:26;::::0;;;;;;;::::1;:33:::0;::::1;::::0;;;;;;;:42;;;;;;;;;;11269:37:::1;:12:::0;11120:42;11269:16:::1;:37::i;:::-;11244:62:::0;-1:-1:-1;11320:18:375;;11316:548:::1;;11604:36;11626:14:::0;11604:19;:36:::1;:::i;:::-;11574:10;11559:26;::::0;;;:14:::1;:26;::::0;;;;;;;::::1;:33:::0;::::1;::::0;;;;;;;;;:42;;;;;;;;;:81;;;;11659:66;;42125:34:558;;;42175:18;;42168:43;42227:18;;;42220:34;;;42285:2;42270:18;;42263:34;;;42328:3;42313:19;;42306:35;;;11659:66:375::1;::::0;42051:3:558;42036:19;11659:66:375::1;;;;;;;11739:54;:26;::::0;::::1;11766:10;11778:14:::0;11739:26:::1;:54::i;:::-;11808:45;11844:1;11828:18;::::0;11808:45:::1;10964:906;;2303:20:301::0;1716:1;2809:7;:22;2629:209;2336:287;1759:1;2468:7;;:19;2460:63;;;;;;;42554:2:558;2460:63:301;;;42536:21:558;42593:2;42573:18;;;42566:30;42632:33;42612:18;;;42605:61;42683:18;;2460:63:301;42352:355:558;2460:63:301;1759:1;2598:7;:18;2336:287::o;569:120:387:-;628:7;675:5;664:17;;;;;;;;:::i;:::-;;;;;;;;;;;;;654:28;;;;;;647:35;;569:120;;;:::o;30599:5671:375:-;30823:27;;:::i;:::-;30886:17;30906:12;:5;:10;:12::i;:::-;31027:40;;;1180:1:388;31027:40:375;;;;;;;;;30886:32;;-1:-1:-1;30933:26:375;;30991:33;;31027:40;;;;;;;;;;;;;;;;;;;-1:-1:-1;31221:11:375;;3876:4:359;3870:11;;3908:1;3894:16;;3941:4;3930:16;;3923:27;;;31205:29:375;;;;3970:16:359;;;3963:27;31236:30:375;;;3788:22:359;4010:16;;4003:27;4067:4;4056:16;;4043:30;;30991:76:375;;-1:-1:-1;31085:14:375;31133:1;1597::388;31100:34:375;31085:50;;;;;;;;:::i;:::-;;;;;;:199;;;;31353:476;31416:5;:17;;;31434:12;31416:31;;;;;;;;:::i;:::-;;;;;;;:37;;;31400:55;;31477:5;:17;;;31495:12;31477:31;;;;;;;;:::i;:::-;;;;;;;:40;;;31353:476;;31539:5;:17;;;31557:12;31539:31;;;;;;;;:::i;:::-;;;;;;;:39;;;31600:14;:27;31615:5;:11;;;31600:27;;;;;;;;;;;;;;;:66;31628:5;:17;;;31646:12;31628:31;;;;;;;;:::i;:::-;;;;;;;:37;;;31600:66;;;;;;;;;;;;;;;:132;31667:5;:17;;;31685:12;31667:31;;;;;;;;:::i;:::-;;;;;;;:64;;;31600:132;;;;;;;;;;;;31810:1;5801:4:359;5795:11;;5833:1;5819:16;;5866:4;5855:16;;5848:27;;;;5895:16;;;5888:27;;;;5709:22;5935:16;;5928:27;;;;5986:4;5975:16;;5968:27;6026:4;6015:16;;6008:27;6072:4;6061:16;;6048:30;;5795:11;5588:506;31353:476:375;31303:14;31348:1;2541::388;31318:31:375;31303:47;;;;;;;;:::i;:::-;;;;;;:526;;;;31899:486;31962:5;:18;;;31981:13;31962:33;;;;;;;;:::i;:::-;;;;;;;:39;;;31946:57;;32025:5;:18;;;32044:13;32025:33;;;;;;;;:::i;:::-;;;;;;;:42;;;31899:486;;32089:5;:18;;;32108:13;32089:33;;;;;;;;:::i;:::-;;;;;;;:41;;;32152:14;:27;32167:5;:11;;;32152:27;;;;;;;;;;;;;;;:68;32180:5;:18;;;32199:13;32180:33;;;;;;;;:::i;:::-;;;;;;;:39;;;32152:68;;;;;;;;;;;;;;;:136;32221:5;:18;;;32240:13;32221:33;;;;;;;;:::i;31899:486::-;31848:14;31894:1;2708::388;31863:32:375;31848:48;;;;;;;;:::i;:::-;;;;;;:537;;;;32413:47;32430:14;32446:13;32413:16;:47::i;:::-;32403:57;;30973:1502;32651:24;32714:5;:11;;;32698:29;;32651:77;;33070:36;33108:34;33146:5;:32;;;:61;;;:84;;;33248:5;:15;;;:21;;;33287:55;33317:9;33336:4;1044:42:344;1141:25;;;1186:4;1179:20;1247:4;1234:18;;;924:344;33287:55:375;33360:15;;;;:24;;;4766:1;33446:7;4766:1;33471:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;33471:16:375;;33146:355;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;33069:432;;;;5079:1;33655:19;:26;:56;33651:157;;;33766:19;:26;33738:55;;;;;;;;;3320:25:558;;3308:2;3293:18;;3174:177;33651:157:375;33822:31;33876:19;33896:1;33876:22;;;;;;;;:::i;:::-;;;;;;;33822:77;;33913:20;33936:19;33956:1;33936:22;;;;;;;;:::i;:::-;;;;;;;33913:45;;34127:25;34155:14;:27;34170:5;:11;;;34155:27;;;;;;;;;;;;;;;:68;34183:5;:18;;;34202:13;34183:33;;;;;;;;:::i;:::-;;;;;;;:39;;;34155:68;;;;;;;;;;;;;;;:132;34224:5;:39;;;34264:13;34224:54;;;;;;;;:::i;:::-;;;;;;;:62;;;34155:132;;;;;;;;;;;;34127:160;;35340:34;35417:72;35443:5;:18;;;35462:13;35443:33;;;;;;;;:::i;:::-;;;;;;;:42;;;35417:72;;35487:1;35417:17;:25;;:72;;;;;:::i;:::-;35340:150;;35576:19;35534:16;35512:84;35508:169;;;35639:19;35620:38;;35508:169;-1:-1:-1;;3104:4:359;3098:11;;3136:1;3122:16;;3169:4;3158:16;;3151:27;;;3198:16;;;3191:27;;;3016:22;3244:16;;3231:30;;;35788:7:375;2037:1:388;35788:36:375;;;;;;;;:::i;:::-;;;;;;;;;;;:135;;;;35945:308;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;35945:308:375;;;;;;;;;;;-1:-1:-1;;;;35945:308:375;;;;-1:-1:-1;35945:308:375;30599:5671::o;6285:849:56:-;6369:7;6439:8;253:2:54;6416:31:56;6412:706;;;253:2:54;6487:31:56;;;503:6:54;6540:21:56;;:25;6536:185;;6596:31;6614:1;6617:9;6596:17;:31::i;:::-;6589:38;;;;;6536:185;6681:21;6689:1;6692:9;6681:7;:21::i;6412:706::-;253:2:54;6745:8:56;:31;6741:377;;;6818:31;;;416:1:54;6871:21:56;;:25;6867:190;;6927:32;6944:1;6947:11;6927:16;:32::i;6867:190::-;7013:25;7023:1;7026:11;7013:9;:25::i;6741:377::-;-1:-1:-1;7102:1:56;7095:8;;649:163:55;741:7;767:38;:1;776;339:4:54;796:8:55;767;:38::i;:::-;760:45;649:163;-1:-1:-1;;;;649:163:55:o;7553:878:56:-;7642:7;7712:14;253:2:54;7689:37:56;7685:730;;;253:2:54;7768:37:56;;;416:1:54;7827:21:56;;:25;7823:190;;7883:32;7900:1;7903:11;7883:16;:32::i;7685:730::-;253:2:54;8037:14:56;:37;8033:382;;;8114:37;;;503:6:54;8173:21:56;;:25;8169:185;;8229:31;8247:1;8250:9;8229:17;:31::i;36790:1324:375:-;37000:5;36911:18;:26;;;2541:1:388;36911:55:375;;;;;;;;:::i;:::-;;;;;;;3525:1:388;36911:86:375;;;;;;;;:::i;:::-;;;;;;:94;;;;;37105:6;37015:18;:26;;;2708:1:388;37015:56:375;;;;;;;;:::i;:::-;;;;;;;3525:1:388;37015:87:375;;;;;;;;:::i;:::-;;;;;;;;;;:96;37126:9;;37122:379;;37237:24;;:30;37222:46;;;;;;:14;:46;;;;;37302:26;;;;:55;;37485:5;;37222:46;37302:26;2541:1:388;;37302:55:375;;;;;;:::i;:::-;;;;;;;2826:1:388;37302:79:375;;;;;;;;:::i;:::-;;;;;;;37222:175;;;;;;;;;;;;;;;:259;37398:18;:26;;;2541:1:388;37398:55:375;;;;;;;;:::i;:::-;;;;;;;3068:1:388;37398:82:375;;;;;;;;:::i;:::-;;;;;;;37222:259;;;;;;;;;;;;:268;;;;;;;:::i;:::-;;;;-1:-1:-1;;37122:379:375;37514:10;;37510:384;;37627:24;;:30;37612:46;;;;;;:14;:46;;;;;37692:26;;;;:56;;37877:6;;37612:46;37692:26;2708:1:388;;37692:56:375;;;;;;:::i;:::-;;;;;;;2826:1:388;37692:80:375;;;;;;;;:::i;:::-;;;;;;;37612:176;;;;;;;;;;;;;;;:261;37789:18;:26;;;2708:1:388;37789:56:375;;;;;;;;:::i;:::-;;;;;;;3068:1:388;37789:83:375;;;;;;;;:::i;:::-;;;;;;;37612:261;;;;;;;;;;;;:271;;;;;;;:::i;:::-;;;;-1:-1:-1;;37510:384:375;38060:47;38068:10;38080:18;:26;;;38060:47;;;;;;;:::i;:::-;;;;;;;;36790:1324;;;:::o;941:175:306:-;1050:58;;46676:42:558;46664:55;;1050:58:306;;;46646:74:558;46736:18;;;46729:34;;;1023:86:306;;1043:5;;1073:23;;46619:18:558;;1050:58:306;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1023:19;:86::i;:::-;941:175;;;:::o;1355:203::-;1482:68;;22806:42:558;22875:15;;;1482:68:306;;;22857:34:558;22927:15;;22907:18;;;22900:43;22959:18;;;22952:34;;;1455:96:306;;1475:5;;1505:27;;22769:18:558;;1482:68:306;22594:398:558;1455:96:306;1355:203;;;;:::o;38120:2357:375:-;38425:22;;;;:29;:33;38421:489;;38801:24;;:34;;;;;:40;;38846:28;;;;38876:22;;;;38801:98;;;;;:44;;;;;;;:98;;38846:28;;38801:98;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;38421:489;39400:37;;:60;;;;;:85;;39518:40;;;;39602:28;;;;39336:30;1141:25:344;;;39640:4:375;1179:20:344;;;1247:4;1234:18;;39336:30:375;;39400:104;;;;;39660:24;;:34;;;:43;;;39751:26;;;;4956:1;;39660:24;39791:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;39791:16:375;;39400:417;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;40008:18;;39335:482;;-1:-1:-1;39335:482:375;-1:-1:-1;40008:22:375;40004:467;;40373:24;;:34;;;;;:40;;40418:28;;;;40373:87;;;;;:44;;;;;;;:87;;40448:11;;40373:87;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;38195:2282;;38120:2357;:::o;3984:782:388:-;4134:10;4157:22;-1:-1:-1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4157:22:388;4194:9;4189:571;4213:4;:11;4209:1;:15;4189:571;;;4254:4;4259:1;4254:7;;;;;;;;:::i;:::-;;;;;;;4245:16;;4276:22;4300:23;4327:6;:16;;;:28;;;:34;;;4379:6;:16;;;:22;;;4419:55;4449:9;4468:4;1044:42:344;1141:25;;;1186:4;1179:20;1247:4;1234:18;;;924:344;4419:55:388;4492:6;:16;;;:25;;;4554:1;4574:47;4591:7;4600:6;:20;;;4574:16;:47::i;:::-;4639:16;;;4653:1;4639:16;;;;;;;;;4327:342;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;4704:16;;:22;;;:45;;;;;4275:394;;-1:-1:-1;4275:394:388;;-1:-1:-1;4704:26:388;;;;;:45;;4731:9;;4275:394;;4704:45;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4231:529;;4226:3;;;;;4189:571;;41021:654:375;41205:40;-1:-1:-1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;41205:40:375;41386:72;41411:23;41436:21;41386:24;:72::i;:::-;41312:146;;41313:27;;;41312:146;41596:72;41621:21;41644:23;41596:24;:72::i;:::-;41554:26;;;41526:142;41527:25;;;41526:142;41527:16;41021:654;-1:-1:-1;;41021:654:375:o;1159:154:63:-;1236:18;1249:4;1236:12;:18::i;:::-;1231:76;;1291:4;1277:19;;;;;;;;;;;:::i;1231:76::-;1159:154;:::o;6674:198:308:-;6757:12;6788:77;6809:6;6817:4;6788:77;;;;;;;;;;;;;;;;;:20;:77::i;588:104:317:-;646:7;676:1;672;:5;:13;;684:1;672:13;;;-1:-1:-1;680:1:317;;588:104;-1:-1:-1;588:104:317:o;7542:2290:341:-;7677:18;7735:24;7776:14;:21;7762:36;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;7762:36:341;;7735:63;;7947:21;8021:1;7997:14;:21;:25;:57;;8053:1;7997:57;;;8025:14;:21;8049:1;8025:25;7997:57;7975:11;:18;7971:1;:22;:84;7947:108;;8070:26;8115:13;8099:30;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8070:59;;8143:14;8193:17;3104:4:359;3098:11;;3136:1;3122:16;;2664:10:341;3169:4:359;3158:16;;3151:27;2702:4:341;3198:16:359;;;3191:27;2587:16:341;3244::359;;3231:30;;;3098:11;2548:169:341;8193:17;8175:7;8183:6;8175:15;;;;;;;;:::i;:::-;;;;;;:35;;;;8230:9;8225:140;8249:11;:18;8245:1;:22;8225:140;;;8292:8;;;;;;;8336:11;8348:1;8336:14;;;;;;;;:::i;:::-;;;;;;;8318:7;8326:6;8318:15;;;;;;;;:::i;:::-;;;;;;;;;;:32;8269:3;;8225:140;;;-1:-1:-1;8383:21:341;;:25;8379:1408;;8428:8;;;;;;;8472:7;8454;8462:6;8454:15;;;;;;;;:::i;:::-;;;;;;:25;;;;8503:9;8498:1275;8522:14;:21;8518:1;:25;8498:1275;;;9200:284;9266:14;9281:1;9266:17;;;;;;;;:::i;:::-;;;;;;;:24;;;9320:81;9349:51;9374:14;9389:1;9374:17;;;;;;;;:::i;:::-;;;;;;;:25;;;4081:13:295;;4096:4;4077:24;;;4058:17;;4048:54;;3908:210;9349:51:341;7389:34:312;7189:15;7376:48;;;7444:4;7437:18;;;;7495:4;7479:21;;;7120:396;9320:81:341;9431:14;9446:1;9431:17;;;;;;;;:::i;:::-;;;;;;;:27;;;9200:36;:284::i;:::-;8572:1010;;9540:19;;;;;;;;3320:25:558;;;3293:18;;9540:19:341;3174:177:558;8572:1010:341;9633:14;9648:1;9633:17;;;;;;;;:::i;:::-;;;;;;;:24;;;9617:42;;9604:7;9612:1;9604:10;;;;;;;;:::i;:::-;;;;;;:55;;;;;9681:8;;;;;;;9729:14;9744:1;9729:17;;;;;;;;:::i;:::-;;;;;;;:25;;;9711:7;9719:6;9711:15;;;;;;;;:::i;:::-;;;;;;;;;;:43;8545:3;;8498:1275;;;;8379:1408;-1:-1:-1;9808:7:341;7542:2290;-1:-1:-1;;;;;7542:2290:341:o;3762:689:56:-;3842:9;726:2:54;3891:9:56;:34;3887:548;;3949:6;;:30;;3962:17;3949:30;;;3958:1;3949:30;3945:34;;3887:548;;;-1:-1:-1;4161:2:56;:15;;;4198:6;;;;:1;4161:15;4198:6;4161:15;4385:6;;;;:::i;:::-;;:11;:35;;4403:17;4385:35;;;-1:-1:-1;4399:1:56;4381:39;-1:-1:-1;;3762:689:56:o;2818:688::-;2993:2;:15;;;3032:5;2993:15;3032:1;:5;:::i;:::-;3028:9;;726:2:54;3407:9:56;:34;3403:97;;3461:6;;:28;;3474:15;3480:9;3474:2;:15;:::i;:::-;3461:28;;;-1:-1:-1;3470:1:56;;2818:688;-1:-1:-1;;2818:688:56:o;5400:598::-;5481:9;726:2:54;5530:11:56;:36;5526:456;;5590:6;;:14;;5603:1;5590:14;;;5599:1;5590:14;5586:18;;;;5526:456;;;5655:2;:17;;;;5694:1;5655:17;5694:5;;;;:::i;:::-;;5690:9;;5918:1;5914;:5;5909:1;:10;5905:63;;-1:-1:-1;5948:1:56;5943:6;;5400:598;-1:-1:-1;;5400:598:56:o;4824:207::-;4898:7;726:2:54;4948:11:56;:36;;:66;;5002:11;4996:2;:17;4991:1;:23;;;;;:::i;:::-;;4948:66;;6012:299:317;6113:7;6132:14;6149:25;6156:1;6159;6162:11;6149:6;:25::i;:::-;6132:42;-1:-1:-1;6200:11:317;6188:8;:23;;;;;;;;:::i;:::-;;:56;;;;;6243:1;6228:11;6215:25;;;;;:::i;:::-;6225:1;6222;6215:25;:29;6188:56;6184:98;;;6260:11;6270:1;6260:11;;:::i;:::-;;;6184:98;6298:6;6012:299;-1:-1:-1;;;;;6012:299:317:o;5196:642:306:-;5615:23;5641:69;5669:4;5641:69;;;;;;;;;;;;;;;;;5649:5;5641:27;;;;:69;;;;;:::i;:::-;5615:95;;5728:10;:17;5749:1;5728:22;:56;;;;5765:10;5754:30;;;;;;;;;;;;:::i;:::-;5720:111;;;;;;;49901:2:558;5720:111:306;;;49883:21:558;49940:2;49920:18;;;49913:30;49979:34;49959:18;;;49952:62;50050:12;50030:18;;;50023:40;50080:19;;5720:111:306;49699:406:558;41681:2025:375;41864:18;41884:19;42108:27;42170:147;42256:21;:29;;;42287:16;42192:21;:31;;;42170:68;;:147;;;;;:::i;:::-;42371:33;;;;42108:219;;-1:-1:-1;42495:77:375;;;42491:183;;;-1:-1:-1;42648:13:375;42491:183;42819:163;42879:23;:29;;;:42;;;42922:23;:37;;;42879:81;;;;;;;;:::i;:::-;;;;;;;:90;;;42819:163;;42971:1;42841:16;42819:46;;:163;;;;;:::i;:::-;42805:177;;43071:26;43132:104;43186:23;:31;;;43219:16;43154;43132:53;;:104;;;;;:::i;:::-;43071:175;;43533:166;43588:21;:27;;;:40;;;43629:21;:35;;;43588:77;;;;;;;;:::i;43533:166::-;43256:443;;41905:1801;;;41681:2025;;;;;:::o;644:368:63:-;708:4;742:1;728:4;:11;:15;724:33;;;-1:-1:-1;752:5:63;;644:368;-1:-1:-1;644:368:63:o;724:33::-;-1:-1:-1;934:1:63;924:12;918:19;782:16;914:30;667:18:59;970:35:63;;644:368::o;7058:325:308:-;7199:12;7224;7238:23;7265:6;:19;;7285:4;7265:25;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7223:67;;;;7307:69;7334:6;7342:7;7351:10;7363:12;7307:26;:69::i;:::-;7300:76;7058:325;-1:-1:-1;;;;;;7058:325:308:o;1014:366:313:-;1120:4;1137:17;1156:24;1184:33;1201:4;1207:9;1184:16;:33::i;:::-;1136:81;;-1:-1:-1;1136:81:313;-1:-1:-1;1256:26:313;1247:5;:35;;;;;;;;:::i;:::-;;:58;;;;;1299:6;1286:19;;:9;:19;;;1247:58;1246:127;;;;1322:51;1349:6;1357:4;1363:9;1322:26;:51::i;1667:4213:317:-;1749:14;;;2289:6;2286:1;2283;2276:20;2329:1;2326;2322:9;2313:18;;2384:5;2380:2;2377:13;2369:5;2365:2;2361:14;2357:34;2348:43;;;2486:5;2495:1;2486:10;2482:368;;2824:11;2816:5;:19;;;;;:::i;:::-;;2809:26;;;;;;2482:368;2974:5;2960:11;:19;2952:53;;;;;;;50506:2:558;2952:53:317;;;50488:21:558;50545:2;50525:18;;;50518:30;50584:23;50564:18;;;50557:51;50625:18;;2952:53:317;50304:345:558;2952:53:317;3261:17;3396:11;3393:1;3390;3383:25;4774:1;3944;3929:12;;:16;;3914:32;;4049:22;;;;4755:1;:15;;4754:21;;5007;;;5003:25;;4992:36;5076:21;;;5072:25;;5061:36;5146:21;;;5142:25;;5131:36;5216:21;;;5212:25;;5201:36;5286:21;;;5282:25;;5271:36;5357:21;;;5353:25;;;5342:36;;;3899:12;4294;;;4290:23;;;4286:31;;;3510:20;;;3499:32;;;4406:12;;;;3557:21;;4147:16;;;;4397:21;;;;5821:15;;;-1:-1:-1;;;;1667:4213:317:o;4108:223:308:-;4241:12;4272:52;4294:6;4302:4;4308:1;4311:12;4272:21;:52::i;7671:628::-;7851:12;7879:7;7875:418;;;7906:10;:17;7927:1;7906:22;7902:286;;1702:19;;;;8113:60;;;;;;;50856:2:558;8113:60:308;;;50838:21:558;50895:2;50875:18;;;50868:30;50934:31;50914:18;;;50907:59;50983:18;;8113:60:308;50654:353:558;8113:60:308;-1:-1:-1;8208:10:308;8201:17;;7875:418;8249:33;8257:10;8269:12;8249:7;:33::i;2145:730:312:-;2226:7;2235:12;2263:9;:16;2283:2;2263:22;2259:610;;2599:4;2584:20;;2578:27;2648:4;2633:20;;2627:27;2705:4;2690:20;;2684:27;2301:9;2676:36;2746:25;2757:4;2676:36;2578:27;2627;2746:10;:25::i;:::-;2739:32;;;;;;;;;2259:610;-1:-1:-1;2818:1:312;;-1:-1:-1;2822:35:312;2259:610;2145:730;;;;;:::o;1786:473:313:-;1929:4;1946:12;1960:19;1983:6;:17;;2037:34;;;2073:4;2079:9;2014:75;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1983:116;;;;2014:75;1983:116;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1945:154;;;;2117:7;:42;;;;;2157:2;2140:6;:13;:19;;2117:42;:134;;;;-1:-1:-1;2175:29:313;;2216:34;;2175:29;;;;;;;;;;;;:::i;:::-;:76;;1786:473;-1:-1:-1;;;;;;1786:473:313:o;5165:446:308:-;5330:12;5387:5;5362:21;:30;;5354:81;;;;;;;51516:2:558;5354:81:308;;;51498:21:558;51555:2;51535:18;;;51528:30;51594:34;51574:18;;;51567:62;51665:8;51645:18;;;51638:36;51691:19;;5354:81:308;51314:402:558;5354:81:308;5446:12;5460:23;5487:6;:11;;5506:5;5513:4;5487:31;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5445:73;;;;5535:69;5562:6;5570:7;5579:10;5591:12;5535:26;:69::i;:::-;5528:76;5165:446;-1:-1:-1;;;;;;;5165:446:308:o;8821:540::-;8980:17;;:21;8976:379;;9208:10;9202:17;9264:15;9251:10;9247:2;9243:19;9236:44;8976:379;9331:12;9324:20;;;;;;;;;;;:::i;5009:1456:312:-;5097:7;;6021:66;6008:79;;6004:161;;;-1:-1:-1;6119:1:312;;-1:-1:-1;6123:30:312;6103:51;;6004:161;6276:24;;;6259:14;6276:24;;;;;;;;;52181:25:558;;;52254:4;52242:17;;52222:18;;;52215:45;;;;52276:18;;;52269:34;;;52319:18;;;52312:34;;;6276:24:312;;52153:19:558;;6276:24:312;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;6276:24:312;;;;;;-1:-1:-1;;6314:20:312;;;6310:101;;6366:1;6370:29;6350:50;;;;;;;6310:101;6429:6;-1:-1:-1;6437:20:312;;-1:-1:-1;5009:1456:312;;;;;;;;:::o;-1:-1:-1:-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;14:332:558:-;72:6;125:2;113:9;104:7;100:23;96:32;93:52;;;141:1;138;131:12;93:52;180:9;167:23;230:66;223:5;219:78;212:5;209:89;199:117;;312:1;309;302:12;543:167;614:5;659:3;650:6;645:3;641:16;637:26;634:46;;;676:1;673;666:12;634:46;-1:-1:-1;698:6:558;543:167;-1:-1:-1;543:167:558:o;715:379::-;813:6;866:2;854:9;845:7;841:23;837:32;834:52;;;882:1;879;872:12;834:52;922:9;909:23;955:18;947:6;944:30;941:50;;;987:1;984;977:12;941:50;1010:78;1080:7;1071:6;1060:9;1056:22;1010:78;:::i;1352:180::-;1411:6;1464:2;1452:9;1443:7;1439:23;1435:32;1432:52;;;1480:1;1477;1470:12;1432:52;-1:-1:-1;1503:23:558;;1352:180;-1:-1:-1;1352:180:558:o;1537:177::-;1646:42;1639:5;1635:54;1628:5;1625:65;1615:93;;1704:1;1701;1694:12;1719:157;1787:20;;1816:54;1787:20;1816:54;:::i;:::-;1719:157;;;:::o;1881:1013::-;2009:6;2017;2025;2033;2041;2094:3;2082:9;2073:7;2069:23;2065:33;2062:53;;;2111:1;2108;2101:12;2062:53;2150:9;2137:23;2169:54;2217:5;2169:54;:::i;:::-;2242:5;-1:-1:-1;2299:2:558;2284:18;;2271:32;2312:56;2271:32;2312:56;:::i;:::-;2387:7;-1:-1:-1;2441:2:558;2426:18;;2413:32;;-1:-1:-1;2496:2:558;2481:18;;2468:32;2519:18;2549:14;;;2546:34;;;2576:1;2573;2566:12;2546:34;2614:6;2603:9;2599:22;2589:32;;2659:7;2652:4;2648:2;2644:13;2640:27;2630:55;;2681:1;2678;2671:12;2630:55;2721:2;2708:16;2747:2;2739:6;2736:14;2733:34;;;2763:1;2760;2753:12;2733:34;2808:7;2803:2;2794:6;2790:2;2786:15;2782:24;2779:37;2776:57;;;2829:1;2826;2819:12;2776:57;1881:1013;;;;-1:-1:-1;1881:1013:558;;-1:-1:-1;2860:2:558;2852:11;;2882:6;1881:1013;-1:-1:-1;;;1881:1013:558:o;2899:270::-;2958:6;3011:2;2999:9;2990:7;2986:23;2982:32;2979:52;;;3027:1;3024;3017:12;2979:52;3066:9;3053:23;3085:54;3133:5;3085:54;:::i;3356:384::-;3436:8;3446:6;3500:3;3493:4;3485:6;3481:17;3477:27;3467:55;;3518:1;3515;3508:12;3467:55;-1:-1:-1;3541:20:558;;3584:18;3573:30;;3570:50;;;3616:1;3613;3606:12;3570:50;3653:4;3645:6;3641:17;3629:29;;3713:3;3706:4;3696:6;3693:1;3689:14;3681:6;3677:27;3673:38;3670:47;3667:67;;;3730:1;3727;3720:12;3745:750;3897:6;3905;3913;3966:2;3954:9;3945:7;3941:23;3937:32;3934:52;;;3982:1;3979;3972:12;3934:52;4022:9;4009:23;4051:18;4092:2;4084:6;4081:14;4078:34;;;4108:1;4105;4098:12;4078:34;4131:78;4201:7;4192:6;4181:9;4177:22;4131:78;:::i;:::-;4121:88;;4262:2;4251:9;4247:18;4234:32;4218:48;;4291:2;4281:8;4278:16;4275:36;;;4307:1;4304;4297:12;4275:36;;4346:89;4427:7;4416:8;4405:9;4401:24;4346:89;:::i;:::-;3745:750;;4454:8;;-1:-1:-1;4320:115:558;;-1:-1:-1;;;;3745:750:558:o;4500:778::-;4642:6;4650;4658;4666;4674;4727:3;4715:9;4706:7;4702:23;4698:33;4695:53;;;4744:1;4741;4734:12;4695:53;4783:9;4770:23;4802:54;4850:5;4802:54;:::i;:::-;4875:5;-1:-1:-1;4927:2:558;4912:18;;4899:32;;-1:-1:-1;4978:2:558;4963:18;;4950:32;;-1:-1:-1;5033:2:558;5018:18;;5005:32;5060:18;5049:30;;5046:50;;;5092:1;5089;5082:12;5046:50;5131:87;5210:7;5201:6;5190:9;5186:22;5131:87;:::i;:::-;4500:778;;;;-1:-1:-1;4500:778:558;;-1:-1:-1;5237:8:558;;5105:113;4500:778;-1:-1:-1;;;4500:778:558:o;5283:184::-;5335:77;5332:1;5325:88;5432:4;5429:1;5422:15;5456:4;5453:1;5446:15;5472:253;5544:2;5538:9;5586:4;5574:17;;5621:18;5606:34;;5642:22;;;5603:62;5600:88;;;5668:18;;:::i;:::-;5704:2;5697:22;5472:253;:::o;5730:::-;5802:2;5796:9;5844:4;5832:17;;5879:18;5864:34;;5900:22;;;5861:62;5858:88;;;5926:18;;:::i;5988:257::-;6060:4;6054:11;;;6092:17;;6139:18;6124:34;;6160:22;;;6121:62;6118:88;;;6186:18;;:::i;6250:334::-;6321:2;6315:9;6377:2;6367:13;;6382:66;6363:86;6351:99;;6480:18;6465:34;;6501:22;;;6462:62;6459:88;;;6527:18;;:::i;:::-;6563:2;6556:22;6250:334;;-1:-1:-1;6250:334:558:o;6589:589::-;6631:5;6684:3;6677:4;6669:6;6665:17;6661:27;6651:55;;6702:1;6699;6692:12;6651:55;6738:6;6725:20;6764:18;6760:2;6757:26;6754:52;;;6786:18;;:::i;:::-;6830:114;6938:4;6869:66;6862:4;6858:2;6854:13;6850:86;6846:97;6830:114;:::i;:::-;6969:2;6960:7;6953:19;7015:3;7008:4;7003:2;6995:6;6991:15;6987:26;6984:35;6981:55;;;7032:1;7029;7022:12;6981:55;7097:2;7090:4;7082:6;7078:17;7071:4;7062:7;7058:18;7045:55;7145:1;7120:16;;;7138:4;7116:27;7109:38;;;;7124:7;6589:589;-1:-1:-1;;;6589:589:558:o;7183:670::-;7241:5;7289:4;7277:9;7272:3;7268:19;7264:30;7261:50;;;7307:1;7304;7297:12;7261:50;7329:22;;:::i;:::-;7320:31;;7388:9;7375:23;7407:56;7455:7;7407:56;:::i;:::-;7472:22;;7546:2;7531:18;;7518:32;7559:56;7518:32;7559:56;:::i;:::-;7642:2;7631:14;;7624:31;7706:2;7691:18;;7678:32;7733:18;7722:30;;7719:50;;;7765:1;7762;7755:12;7719:50;7801:45;7842:3;7833:6;7822:9;7818:22;7801:45;:::i;:::-;7796:2;7789:5;7785:14;7778:69;;7183:670;;;;:::o;7858:185::-;7920:4;7953:18;7945:6;7942:30;7939:56;;;7975:18;;:::i;:::-;-1:-1:-1;8020:1:558;8016:14;8032:4;8012:25;;7858:185::o;8048:156::-;8114:20;;8174:4;8163:16;;8153:27;;8143:55;;8194:1;8191;8184:12;8209:442;8258:5;8306:4;8294:9;8289:3;8285:19;8281:30;8278:50;;;8324:1;8321;8314:12;8278:50;8346:22;;:::i;:::-;8337:31;;8405:9;8392:23;8424:56;8472:7;8424:56;:::i;:::-;8489:22;;8543:36;8575:2;8560:18;;8543:36;:::i;:::-;8538:2;8531:5;8527:14;8520:60;8640:2;8629:9;8625:18;8612:32;8607:2;8600:5;8596:14;8589:56;8209:442;;;;:::o;8656:711::-;8712:5;8765:3;8758:4;8750:6;8746:17;8742:27;8732:55;;8783:1;8780;8773:12;8732:55;8819:6;8806:20;8845:4;8869:62;8885:45;8927:2;8885:45;:::i;:::-;8869:62;:::i;:::-;8953:3;8977:2;8972:3;8965:15;9005:4;9000:3;8996:14;8989:21;;9029:4;9088;9080;9076:2;9072:13;9064:6;9060:26;9056:37;9042:51;;9116:3;9108:6;9105:15;9102:35;;;9133:1;9130;9123:12;9102:35;9169:4;9161:6;9157:17;9183:155;9199:6;9194:3;9191:15;9183:155;;;9265:30;9291:3;9286;9265:30;:::i;:::-;9253:43;;9316:12;;;;9216;;9183:155;;;-1:-1:-1;9356:5:558;;8656:711;-1:-1:-1;;;;;;;8656:711:558:o;9372:908::-;9426:5;9474:4;9462:9;9457:3;9453:19;9449:30;9446:50;;;9492:1;9489;9482:12;9446:50;9514:22;;:::i;:::-;9505:31;;9559:29;9578:9;9559:29;:::i;:::-;9552:5;9545:44;9640:2;9629:9;9625:18;9612:32;9663:18;9704:2;9696:6;9693:14;9690:34;;;9720:1;9717;9710:12;9690:34;9756:58;9810:3;9801:6;9790:9;9786:22;9756:58;:::i;:::-;9751:2;9744:5;9740:14;9733:82;9868:2;9857:9;9853:18;9840:32;9824:48;;9897:2;9887:8;9884:16;9881:36;;;9913:1;9910;9903:12;9881:36;9949:61;10006:3;9995:8;9984:9;9980:24;9949:61;:::i;:::-;9944:2;9937:5;9933:14;9926:85;10064:2;10053:9;10049:18;10036:32;10020:48;;10093:2;10083:8;10080:16;10077:36;;;10109:1;10106;10099:12;10077:36;;10145:61;10202:3;10191:8;10180:9;10176:24;10145:61;:::i;:::-;10140:2;10133:5;10129:14;10122:85;;10268:3;10257:9;10253:19;10240:33;10234:3;10227:5;10223:15;10216:58;9372:908;;;;:::o;10285:160::-;10349:5;10394:3;10385:6;10380:3;10376:16;10372:26;10369:46;;;10411:1;10408;10401:12;10450:2033;10544:5;10573:66;10589:49;10631:6;10589:49;:::i;10573:66::-;10673:21;;;10564:75;-1:-1:-1;10713:4:558;10733:14;;;;10766:1;10802:14;;;10790:27;;10829:15;;;10826:35;;;10857:1;10854;10847:12;10826:35;10881:6;10896:1581;10912:6;10907:3;10904:15;10896:1581;;;10998:3;10985:17;11025:18;11075:2;11062:11;11059:19;11056:39;;;11091:1;11088;11081:12;11056:39;11118:24;;;;11176:4;11162:12;;;11158:23;11155:43;;;11194:1;11191;11184:12;11155:43;11224:22;;:::i;:::-;11287:2;11274:16;11303:56;11351:7;11303:56;:::i;:::-;11372:22;;11436:11;;;11423:25;11464:16;;;11461:36;;;11493:1;11490;11483:12;11461:36;11520:17;;11572:4;11564:13;;11560:23;-1:-1:-1;11550:51:558;;11597:1;11594;11587:12;11550:51;11637:2;11624:16;11666:62;11682:45;11724:2;11682:45;:::i;11666:62::-;11772:17;;;11866:11;;;11858:20;;11854:29;;;11811:14;;;;11899:17;;;11896:37;;;11929:1;11926;11919:12;11896:37;11959:11;;;;11983:174;12001:8;11994:5;11991:19;11983:174;;;12083:19;;12069:34;;12022:14;;;;12129;;;;11983:174;;;12177:14;;;12170:29;-1:-1:-1;12222:2:558;;-1:-1:-1;;12266:11:558;;;12253:25;12294:16;;;12291:36;;;12323:1;12320;12313:12;12291:36;12363:40;12399:3;12388:8;12384:2;12380:17;12363:40;:::i;:::-;12347:14;;;12340:64;;;;-1:-1:-1;12417:18:558;;-1:-1:-1;;12455:12:558;;;;10929;;10896:1581;;;10900:3;;;;;10450:2033;;;;;:::o;12488:274::-;12557:5;12610:3;12603:4;12595:6;12591:17;12587:27;12577:55;;12628:1;12625;12618:12;12577:55;12650:106;12752:3;12743:6;12730:20;12723:4;12715:6;12711:17;12650:106;:::i;12767:1279::-;13064:6;13072;13080;13088;13096;13149:3;13137:9;13128:7;13124:23;13120:33;13117:53;;;13166:1;13163;13156:12;13117:53;13206:9;13193:23;13235:18;13276:2;13268:6;13265:14;13262:34;;;13292:1;13289;13282:12;13262:34;13315:58;13365:7;13356:6;13345:9;13341:22;13315:58;:::i;:::-;13305:68;;13426:2;13415:9;13411:18;13398:32;13382:48;;13455:2;13445:8;13442:16;13439:36;;;13471:1;13468;13461:12;13439:36;13494:60;13546:7;13535:8;13524:9;13520:24;13494:60;:::i;:::-;13484:70;;13573:67;13632:7;13627:2;13616:9;13612:18;13573:67;:::i;:::-;13563:77;;13693:3;13682:9;13678:19;13665:33;13649:49;;13723:2;13713:8;13710:16;13707:36;;;13739:1;13736;13729:12;13707:36;13762:78;13832:7;13821:8;13810:9;13806:24;13762:78;:::i;:::-;13752:88;;13893:3;13882:9;13878:19;13865:33;13849:49;;13923:2;13913:8;13910:16;13907:36;;;13939:1;13936;13929:12;13907:36;;13962:78;14032:7;14021:8;14010:9;14006:24;13962:78;:::i;:::-;13952:88;;;12767:1279;;;;;;;;:::o;14051:749::-;14209:6;14217;14225;14278:2;14266:9;14257:7;14253:23;14249:32;14246:52;;;14294:1;14291;14284:12;14246:52;14334:9;14321:23;14363:18;14404:2;14396:6;14393:14;14390:34;;;14420:1;14417;14410:12;14390:34;14443:71;14506:7;14497:6;14486:9;14482:22;14443:71;:::i;14805:465::-;14902:6;14910;14963:2;14951:9;14942:7;14938:23;14934:32;14931:52;;;14979:1;14976;14969:12;14931:52;15019:9;15006:23;15052:18;15044:6;15041:30;15038:50;;;15084:1;15081;15074:12;15038:50;15123:87;15202:7;15193:6;15182:9;15178:22;15123:87;:::i;:::-;15229:8;;15097:113;;-1:-1:-1;14805:465:558;-1:-1:-1;;;;14805:465:558:o;15275:356::-;15325:3;15363:5;15357:12;15390:6;15385:3;15378:19;15446:6;15439:4;15432:5;15428:16;15421:4;15416:3;15412:14;15406:47;15498:1;15491:4;15482:6;15477:3;15473:16;15469:27;15462:38;15620:4;15550:66;15545:2;15537:6;15533:15;15529:88;15524:3;15520:98;15516:109;15509:116;;;15275:356;;;;:::o;15636:868::-;15796:4;15825:2;15865;15854:9;15850:18;15895:2;15884:9;15877:21;15918:6;15953;15947:13;15984:6;15976;15969:22;16022:2;16011:9;16007:18;16000:25;;16084:2;16074:6;16071:1;16067:14;16056:9;16052:30;16048:39;16034:53;;16122:2;16114:6;16110:15;16143:1;16153:322;16167:6;16164:1;16161:13;16153:322;;;16256:66;16244:9;16236:6;16232:22;16228:95;16223:3;16216:108;16347:48;16388:6;16379;16373:13;16347:48;:::i;:::-;16337:58;-1:-1:-1;16453:12:558;;;;16418:15;;;;16189:1;16182:9;16153:322;;;-1:-1:-1;16492:6:558;;15636:868;-1:-1:-1;;;;;;;15636:868:558:o;16997:502::-;17074:6;17082;17090;17143:2;17131:9;17122:7;17118:23;17114:32;17111:52;;;17159:1;17156;17149:12;17111:52;17198:9;17185:23;17217:54;17265:5;17217:54;:::i;:::-;17290:5;-1:-1:-1;17347:2:558;17332:18;;17319:32;17360:56;17319:32;17360:56;:::i;:::-;16997:502;;17435:7;;-1:-1:-1;;;17489:2:558;17474:18;;;;17461:32;;16997:502::o;17504:338::-;17572:6;17580;17633:2;17621:9;17612:7;17608:23;17604:32;17601:52;;;17649:1;17646;17639:12;17601:52;17688:9;17675:23;17707:54;17755:5;17707:54;:::i;:::-;17780:5;17832:2;17817:18;;;;17804:32;;-1:-1:-1;;;17504:338:558:o;17847:386::-;17932:6;17985:2;17973:9;17964:7;17960:23;17956:32;17953:52;;;18001:1;17998;17991:12;17953:52;18041:9;18028:23;18074:18;18066:6;18063:30;18060:50;;;18106:1;18103;18096:12;18060:50;18129:22;;18185:3;18167:16;;;18163:26;18160:46;;;18202:1;18199;18192:12;18572:642;18703:4;18709:6;18769:11;18756:25;18859:66;18848:8;18832:14;18828:29;18824:102;18804:18;18800:127;18790:155;;18941:1;18938;18931:12;18790:155;18968:33;;19020:20;;;-1:-1:-1;19063:18:558;19052:30;;19049:50;;;19095:1;19092;19085:12;19049:50;19128:4;19116:17;;-1:-1:-1;19179:1:558;19175:14;;;19159;19155:35;19145:46;;19142:66;;;19204:1;19201;19194:12;19219:184;19271:77;19268:1;19261:88;19368:4;19365:1;19358:15;19392:4;19389:1;19382:15;19408:394;19512:4;19570:11;19557:25;19660:66;19649:8;19633:14;19629:29;19625:102;19605:18;19601:127;19591:155;;19742:1;19739;19732:12;19591:155;19763:33;;;;;19408:394;-1:-1:-1;;19408:394:558:o;19807:972::-;19931:9;19990:4;19982:5;19966:14;19962:26;19958:37;19955:57;;;20008:1;20005;19998:12;19955:57;20041:2;20035:9;20083:4;20075:6;20071:17;20107:18;20175:6;20163:10;20160:22;20155:2;20143:10;20140:18;20137:46;20134:72;;;20186:18;;:::i;:::-;20226:10;20222:2;20215:22;20273:5;20260:19;20246:33;;20302:2;20294:6;20291:14;20288:34;;;20318:1;20315;20308:12;20288:34;20346:61;20392:14;20383:6;20376:5;20372:18;20346:61;:::i;:::-;20338:6;20331:77;20465:2;20458:5;20454:14;20441:28;20436:2;20428:6;20424:15;20417:53;20527:2;20520:5;20516:14;20503:28;20498:2;20490:6;20486:15;20479:53;20581:2;20574:5;20570:14;20557:28;20541:44;;20610:2;20600:8;20597:16;20594:36;;;20626:1;20623;20616:12;20594:36;;20663:81;20729:14;20718:8;20711:5;20707:20;20663:81;:::i;:::-;20658:2;20646:15;;20639:106;-1:-1:-1;20650:6:558;19807:972;-1:-1:-1;;19807:972:558:o;20784:384::-;20878:4;20936:11;20923:25;21026:66;21015:8;20999:14;20995:29;20991:102;20971:18;20967:127;20957:155;;21108:1;21105;21098:12;21173:630;21289:4;21295:6;21355:11;21342:25;21445:66;21434:8;21418:14;21414:29;21410:102;21390:18;21386:127;21376:155;;21527:1;21524;21517:12;21376:155;21554:33;;21606:20;;;-1:-1:-1;21649:18:558;21638:30;;21635:50;;;21681:1;21678;21671:12;21635:50;21714:4;21702:17;;-1:-1:-1;21773:4:558;21761:17;;21745:14;21741:38;21731:49;;21728:69;;;21793:1;21790;21783:12;22140:182;22197:6;22250:2;22238:9;22229:7;22225:23;22221:32;22218:52;;;22266:1;22263;22256:12;22218:52;22289:27;22306:9;22289:27;:::i;22997:184::-;23049:77;23046:1;23039:88;23146:4;23143:1;23136:15;23170:4;23167:1;23160:15;23186:128;23253:9;;;23274:11;;;23271:37;;;23288:18;;:::i;23319:125::-;23384:9;;;23405:10;;;23402:36;;;23418:18;;:::i;23449:668::-;23504:3;23542:5;23536:12;23569:6;23564:3;23557:19;23595:4;23624;23619:3;23615:14;23608:21;;23663:4;23656:5;23652:16;23686:1;23696:396;23710:6;23707:1;23704:13;23696:396;;;23769:13;;23811:9;;23822:42;23807:58;23795:71;;23910:11;;;23904:18;23924:4;23900:29;23886:12;;;23879:51;23953:4;23997:11;;;23991:18;23977:12;;;23970:40;24039:4;24030:14;;;;24067:15;;;;23732:1;23725:9;23696:396;;;-1:-1:-1;24108:3:558;;23449:668;-1:-1:-1;;;;;23449:668:558:o;24122:995::-;24172:3;24200:42;24281:2;24273:5;24267:12;24263:21;24258:3;24251:34;24331:4;24324:5;24320:16;24314:23;24369:4;24362;24357:3;24353:14;24346:28;24431:2;24416:12;24410:19;24406:28;24399:4;24394:3;24390:14;24383:52;24502:2;24494:4;24480:12;24476:23;24470:30;24466:39;24460:3;24455;24451:13;24444:62;24561:4;24547:12;24543:23;24537:30;24515:52;;;24598:4;24592:3;24587;24583:13;24576:27;24625:56;24676:3;24671;24667:13;24651:14;24625:56;:::i;:::-;24612:69;;24729:4;24722:5;24718:16;24712:23;24778:3;24771:5;24767:15;24760:4;24755:3;24751:14;24744:39;24804:53;24851:5;24835:14;24804:53;:::i;:::-;24792:65;;;24905:4;24898:5;24894:16;24888:23;24953:3;24947:4;24943:14;24936:4;24931:3;24927:14;24920:38;24981:52;25028:4;25012:14;24981:52;:::i;:::-;24967:66;;;25082:4;25075:5;25071:16;25065:23;25058:4;25053:3;25049:14;25042:47;25105:6;25098:13;;;24122:995;;;;:::o;25122:439::-;25175:3;25213:5;25207:12;25240:6;25235:3;25228:19;25266:4;25295;25290:3;25286:14;25279:21;;25334:4;25327:5;25323:16;25357:1;25367:169;25381:6;25378:1;25375:13;25367:169;;;25442:13;;25430:26;;25476:12;;;;25511:15;;;;25403:1;25396:9;25367:169;;25566:2023;25814:4;25843:42;25924:2;25916:6;25912:15;25901:9;25894:34;25947:2;25985:3;25980:2;25969:9;25965:18;25958:31;26024:6;26018:13;26068:3;26062;26051:9;26047:19;26040:32;26095:60;26150:3;26139:9;26135:19;26121:12;26095:60;:::i;:::-;26081:74;;26210:2;26202:6;26198:15;26192:22;26186:3;26175:9;26171:19;26164:51;26234:4;26293;26285:6;26281:17;26275:24;26269:3;26258:9;26254:19;26247:53;26319:4;26372;26364:6;26360:17;26354:24;26443:66;26431:9;26423:6;26419:22;26415:95;26409:3;26398:9;26394:19;26387:124;26531:6;26566:14;26560:21;26605:6;26597;26590:22;26640:2;26632:6;26628:15;26621:22;;26699:2;26689:6;26686:1;26682:14;26674:6;26670:27;26666:36;26745:2;26729:14;26725:23;26711:37;;26766:1;26776:694;26790:6;26787:1;26784:13;26776:694;;;26876:66;26867:6;26859;26855:19;26851:92;26846:3;26839:105;26973:6;26967:13;27023:2;27018;27012:9;27008:18;27000:6;26993:34;27076:2;27072;27068:11;27062:18;27117:2;27112;27104:6;27100:15;27093:27;27147:61;27204:2;27196:6;27192:15;27176:14;27147:61;:::i;:::-;27249:11;;;27243:18;27298:19;;;27281:15;;;27274:44;27243:18;27133:75;-1:-1:-1;27341:49:558;27133:75;27243:18;27341:49;:::i;:::-;27413:15;;;;27448:12;;;;27331:59;-1:-1:-1;;;26812:1:558;26805:9;26776:694;;;26780:3;27487:6;27479:14;;;;;;;;;;;27531:6;27524:4;27513:9;27509:20;27502:36;27576:6;27569:4;27558:9;27554:20;27547:36;25566:2023;;;;;;;:::o;27594:580::-;27671:4;27677:6;27737:11;27724:25;27827:66;27816:8;27800:14;27796:29;27792:102;27772:18;27768:127;27758:155;;27909:1;27906;27899:12;27758:155;27936:33;;27988:20;;;-1:-1:-1;28031:18:558;28020:30;;28017:50;;;28063:1;28060;28053:12;28017:50;28096:4;28084:17;;-1:-1:-1;28127:14:558;28123:27;;;28113:38;;28110:58;;;28164:1;28161;28154:12;28179:325;28267:6;28262:3;28255:19;28319:6;28312:5;28305:4;28300:3;28296:14;28283:43;;28371:1;28364:4;28355:6;28350:3;28346:16;28342:27;28335:38;28237:3;28493:4;28423:66;28418:2;28410:6;28406:15;28402:88;28397:3;28393:98;28389:109;28382:116;;28179:325;;;;:::o;28509:610::-;28741:4;28770:42;28851:2;28843:6;28839:15;28828:9;28821:34;28903:2;28895:6;28891:15;28886:2;28875:9;28871:18;28864:43;;28943:6;28938:2;28927:9;28923:18;28916:34;28986:6;28981:2;28970:9;28966:18;28959:34;29030:3;29024;29013:9;29009:19;29002:32;29051:62;29108:3;29097:9;29093:19;29085:6;29077;29051:62;:::i;:::-;29043:70;28509:610;-1:-1:-1;;;;;;;;28509:610:558:o;29124:184::-;29194:6;29247:2;29235:9;29226:7;29222:23;29218:32;29215:52;;;29263:1;29260;29253:12;29215:52;-1:-1:-1;29286:16:558;;29124:184;-1:-1:-1;29124:184:558:o;29915:195::-;30019:9;30056:48;30089:14;30082:5;30056:48;:::i;30115:1059::-;30178:3;30224:5;30211:19;30239:56;30287:7;30239:56;:::i;:::-;30314:42;30377:16;;;30365:29;;30442:4;30431:16;;30418:30;;30457:56;30418:30;30457:56;:::i;:::-;30545:16;30538:4;30529:14;;30522:40;30621:4;30610:16;;30597:30;30678:14;30674:26;;;30702:66;30670:99;30646:124;;30636:152;;30784:1;30781;30774:12;30636:152;30812:30;;30923:4;30910:18;;;30865:21;30951:18;30940:30;;30937:50;;;30983:1;30980;30973:12;30937:50;31032:6;31016:14;31012:27;31003:7;30999:41;30996:61;;;31053:1;31050;31043:12;30996:61;31089:4;31082;31077:3;31073:14;31066:28;31110:58;31162:4;31157:3;31153:14;31145:6;31136:7;31110:58;:::i;31179:593::-;31260:5;31267:6;31327:3;31314:17;31409:66;31398:8;31382:14;31378:29;31374:102;31354:18;31350:127;31340:155;;31491:1;31488;31481:12;31340:155;31519:33;;31623:4;31610:18;;;-1:-1:-1;31571:21:558;;-1:-1:-1;31651:18:558;31640:30;;31637:50;;;31683:1;31680;31673:12;31637:50;31742:4;31734:6;31730:17;31714:14;31710:38;31703:5;31699:50;31696:70;;;31762:1;31759;31752:12;31777:778;31888:6;31883:3;31876:19;31858:3;31914:4;31943;31938:3;31934:14;31927:21;;31971:5;31994:1;32004:526;32018:6;32015:1;32012:13;32004:526;;;32095:6;32082:20;32115:56;32163:7;32115:56;:::i;:::-;32209:42;32196:56;32184:69;;32326:4;32291:33;32308:15;;;32291:33;:::i;:::-;32287:44;32273:12;;;32266:66;32355:4;32406:15;;;32393:29;32379:12;;;32372:51;32446:4;32470:12;;;;32505:15;;;;32040:1;32033:9;32004:526;;32560:1722;32762:4;32791:42;32872:2;32864:6;32860:15;32849:9;32842:34;32912:6;32907:2;32896:9;32892:18;32885:34;32955:2;32950;32939:9;32935:18;32928:30;32993:6;32980:20;33009:54;33057:5;33009:54;:::i;:::-;33099:14;33094:2;33079:18;;33072:42;33174:2;33162:15;;33149:29;33229:14;33225:27;;;33254:66;33221:100;33197:125;;33187:153;;33336:1;33333;33326:12;33187:153;33377:4;33371:3;33360:9;33356:19;33349:33;33405:92;33492:3;33481:9;33477:19;33468:6;33448:18;33444:31;33405:92;:::i;:::-;33391:106;;33540:78;33614:2;33606:6;33602:15;33594:6;33540:78;:::i;:::-;33637:66;33769:2;33757:9;33749:6;33745:22;33741:31;33734:4;33723:9;33719:20;33712:61;33796:84;33873:6;33859:12;33845;33796:84;:::i;:::-;33782:98;;33927:78;34001:2;33993:6;33989:15;33981:6;33927:78;:::i;:::-;33889:116;;;;34070:2;34058:9;34050:6;34046:22;34042:31;34036:3;34025:9;34021:19;34014:60;;34097:88;34178:6;34162:14;34146;34097:88;:::i;:::-;34083:102;;;;34247:3;34239:6;34235:16;34222:30;34216:3;34205:9;34201:19;34194:59;34270:6;34262:14;;;32560:1722;;;;;;:::o;34287:1389::-;34459:9;34494:66;34510:49;34552:6;34510:49;:::i;34494:66::-;34582:3;34606:6;34601:3;34594:19;34632:4;34661;34656:3;34652:14;34645:21;;34707:6;34704:1;34700:14;34693:5;34689:26;34738:14;34730:6;34727:26;34724:46;;;34766:1;34763;34756:12;34724:46;34790:5;34804:839;34820:6;34815:3;34812:15;34804:839;;;34906:3;34893:17;34933:18;34983:2;34970:11;34967:19;34964:39;;;34999:1;34996;34989:12;34964:39;35037:11;35030:5;35026:23;35016:33;;35094:4;35089:2;35073:14;35069:23;35065:34;35062:54;;;35112:1;35109;35102:12;35062:54;35144:22;;:::i;:::-;35206:2;35193:16;35236:2;35228:6;35225:14;35222:34;;;35252:1;35249;35242:12;35222:34;35285:62;35332:14;35323:6;35319:2;35315:15;35285:62;:::i;:::-;35276:7;35269:79;;35398:2;35394;35390:11;35377:25;35431:2;35421:8;35418:16;35415:36;;;35447:1;35444;35437:12;35415:36;35489:78;35552:14;35541:8;35537:2;35533:17;35489:78;:::i;:::-;35471:16;;;35464:104;-1:-1:-1;35581:20:558;;-1:-1:-1;;35621:12:558;;;;34837;;34804:839;;;-1:-1:-1;35665:5:558;;34287:1389;-1:-1:-1;;;;;;34287:1389:558:o;36559:1089::-;36901:4;36930:3;36972:42;36964:6;36960:55;36949:9;36942:74;37052:2;37047;37036:9;37032:18;37025:30;37078:53;37127:2;37116:9;37112:18;37104:6;37078:53;:::i;:::-;37064:67;;37179:9;37171:6;37167:22;37162:2;37151:9;37147:18;37140:50;37207:41;37241:6;37233;37207:41;:::i;:::-;37199:49;;;37297:6;37284:20;37279:2;37268:9;37264:18;37257:48;37367:2;37359:6;37355:15;37342:29;37336:3;37325:9;37321:19;37314:58;37434:2;37426:6;37422:15;37409:29;37403:3;37392:9;37388:19;37381:58;37501:2;37493:6;37489:15;37476:29;37470:3;37459:9;37455:19;37448:58;37568:3;37560:6;37556:16;37543:30;37537:3;37526:9;37522:19;37515:59;37636:3;37628:6;37624:16;37611:30;37605:3;37594:9;37590:19;37583:59;36559:1089;;;;;;;:::o;38211:388::-;38309:4;38367:11;38354:25;38457:66;38446:8;38430:14;38426:29;38422:102;38402:18;38398:127;38388:155;;38539:1;38536;38529:12;38604:207;38716:9;38753:52;38790:14;38783:5;38753:52;:::i;38816:218::-;38896:6;38949:2;38937:9;38928:7;38924:23;38920:32;38917:52;;;38965:1;38962;38955:12;38917:52;38988:40;39020:7;39009:9;38988:40;:::i;39039:451::-;39288:42;39280:6;39276:55;39265:9;39258:74;39368:6;39363:2;39352:9;39348:18;39341:34;39411:2;39406;39395:9;39391:18;39384:30;39239:4;39431:53;39480:2;39469:9;39465:18;39457:6;39431:53;:::i;39495:435::-;39720:42;39712:6;39708:55;39697:9;39690:74;39800:6;39795:2;39784:9;39780:18;39773:34;39843:2;39838;39827:9;39823:18;39816:30;39671:4;39863:61;39920:2;39909:9;39905:18;39897:6;39889;39863:61;:::i;40271:211::-;40312:3;40350:5;40344:12;40394:6;40387:4;40380:5;40376:16;40371:3;40365:36;40456:1;40420:16;;40445:13;;;-1:-1:-1;40420:16:558;;40271:211;-1:-1:-1;40271:211:558:o;40487:343::-;40716:6;40708;40703:3;40690:33;40672:3;40751:6;40746:3;40742:16;40778:1;40774:2;40767:13;40796:28;40821:2;40813:6;40796:28;:::i;41480:320::-;41666:9;41703:91;41779:14;41771:6;41764:5;41703:91;:::i;42712:260::-;42893:2;42882:9;42875:21;42856:4;42913:53;42962:2;42951:9;42947:18;42939:6;42913:53;:::i;42977:679::-;43040:3;43071;43103:5;43097:12;43130:6;43125:3;43118:19;43156:4;43185;43180:3;43176:14;43169:21;;43243:4;43233:6;43230:1;43226:14;43219:5;43215:26;43211:37;43282:4;43275:5;43271:16;43305:1;43315:315;43329:6;43326:1;43323:13;43315:315;;;43412:66;43404:5;43398:4;43394:16;43390:89;43385:3;43378:102;43501:49;43545:4;43536:6;43530:13;43501:49;:::i;:::-;43608:12;;;;43493:57;-1:-1:-1;43573:15:558;;;;43351:1;43344:9;43315:315;;43661:1069;44219:42;44211:6;44207:55;44196:9;44189:74;44299:6;44294:2;44283:9;44279:18;44272:34;44342:3;44337:2;44326:9;44322:18;44315:31;44170:4;44369:54;44418:3;44407:9;44403:19;44395:6;44369:54;:::i;:::-;44459:6;44454:2;44443:9;44439:18;44432:34;44515:9;44507:6;44503:22;44497:3;44486:9;44482:19;44475:51;44549:54;44596:6;44588;44549:54;:::i;:::-;44535:68;;44652:9;44644:6;44640:22;44634:3;44623:9;44619:19;44612:51;44680:44;44717:6;44709;44680:44;:::i;:::-;44672:52;43661:1069;-1:-1:-1;;;;;;;;;43661:1069:558:o;44735:667::-;44800:5;44853:3;44846:4;44838:6;44834:17;44830:27;44820:55;;44871:1;44868;44861:12;44820:55;44900:6;44894:13;44926:4;44950:62;44966:45;45008:2;44966:45;:::i;44950:62::-;45034:3;45058:2;45053:3;45046:15;45086:4;45081:3;45077:14;45070:21;;45143:4;45137:2;45134:1;45130:10;45122:6;45118:23;45114:34;45100:48;;45171:3;45163:6;45160:15;45157:35;;;45188:1;45185;45178:12;45157:35;45224:4;45216:6;45212:17;45238:135;45254:6;45249:3;45246:15;45238:135;;;45320:10;;45308:23;;45351:12;;;;45271;;45238:135;;;-1:-1:-1;45391:5:558;44735:667;-1:-1:-1;;;;;;44735:667:558:o;45407:614::-;45536:6;45544;45597:2;45585:9;45576:7;45572:23;45568:32;45565:52;;;45613:1;45610;45603:12;45565:52;45646:9;45640:16;45675:18;45716:2;45708:6;45705:14;45702:34;;;45732:1;45729;45722:12;45702:34;45755:72;45819:7;45810:6;45799:9;45795:22;45755:72;:::i;:::-;45745:82;;45873:2;45862:9;45858:18;45852:25;45836:41;;45902:2;45892:8;45889:16;45886:36;;;45918:1;45915;45908:12;45886:36;;45941:74;46007:7;45996:8;45985:9;45981:24;45941:74;:::i;:::-;45931:84;;;45407:614;;;;;:::o;46026:441::-;46295:42;46287:6;46283:55;46272:9;46265:74;46375:2;46370;46359:9;46355:18;46348:30;46246:4;46395:66;46457:2;46446:9;46442:18;46434:6;46395:66;:::i;46774:368::-;47017:6;47006:9;46999:25;47060:2;47055;47044:9;47040:18;47033:30;46980:4;47080:56;47132:2;47121:9;47117:18;47109:6;47080:56;:::i;47147:226::-;47294:2;47283:9;47276:21;47257:4;47314:53;47363:2;47352:9;47348:18;47340:6;47314:53;:::i;47378:184::-;47430:77;47427:1;47420:88;47527:4;47524:1;47517:15;47551:4;47548:1;47541:15;47567:168;47640:9;;;47671;;47688:15;;;47682:22;;47668:37;47658:71;;47709:18;;:::i;47740:476::-;47829:1;47866:5;47829:1;47880:330;47901:7;47891:8;47888:21;47880:330;;;48020:4;47952:66;47948:77;47942:4;47939:87;47936:113;;;48029:18;;:::i;:::-;48079:7;48069:8;48065:22;48062:55;;;48099:16;;;;48062:55;48178:22;;;;48138:15;;;;47880:330;;;47884:3;47740:476;;;;;:::o;48221:866::-;48270:5;48300:8;48290:80;;-1:-1:-1;48341:1:558;48355:5;;48290:80;48389:4;48379:76;;-1:-1:-1;48426:1:558;48440:5;;48379:76;48471:4;48489:1;48484:59;;;;48557:1;48552:130;;;;48464:218;;48484:59;48514:1;48505:10;;48528:5;;;48552:130;48589:3;48579:8;48576:17;48573:43;;;48596:18;;:::i;:::-;-1:-1:-1;;48652:1:558;48638:16;;48667:5;;48464:218;;48766:2;48756:8;48753:16;48747:3;48741:4;48738:13;48734:36;48728:2;48718:8;48715:16;48710:2;48704:4;48701:12;48697:35;48694:77;48691:159;;;-1:-1:-1;48803:19:558;;;48835:5;;48691:159;48882:34;48907:8;48901:4;48882:34;:::i;:::-;49012:6;48944:66;48940:79;48931:7;48928:92;48925:118;;;49023:18;;:::i;:::-;49061:20;;48221:866;-1:-1:-1;;;48221:866:558:o;49092:131::-;49152:5;49181:36;49208:8;49202:4;49181:36;:::i;49228:184::-;49280:77;49277:1;49270:88;49377:4;49374:1;49367:15;49401:4;49398:1;49391:15;49417:277;49484:6;49537:2;49525:9;49516:7;49512:23;49508:32;49505:52;;;49553:1;49550;49543:12;49505:52;49585:9;49579:16;49638:5;49631:13;49624:21;49617:5;49614:32;49604:60;;49660:1;49657;49650:12;50110:189;50239:3;50264:29;50289:3;50281:6;50264:29;:::i;51012:297::-;51187:6;51176:9;51169:25;51230:2;51225;51214:9;51210:18;51203:30;51150:4;51250:53;51299:2;51288:9;51284:18;51276:6;51250:53;:::i',
		linkReferences: {}
	},
	methodIdentifiers: {
		'addOrder2(((address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32,bytes32,bytes),((address,address,bytes),(address,uint256[],bytes)[])[])':
			'a616864d',
		'clear2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(uint256,uint256,uint256,uint256,uint256,uint256),(address,uint256[],bytes)[],(address,uint256[],bytes)[])':
			'a08f5dff',
		'deposit2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])':
			'91337c0a',
		'enact(((address,address,bytes),(address,uint256[],bytes)[])[])': 'c1e4c4af',
		'flashFee(address,uint256)': 'd9d98ce4',
		'flashLoan(address,address,uint256,bytes)': '5cffe9de',
		'maxFlashLoan(address)': '613255ab',
		'multicall(bytes[])': 'ac9650d8',
		'orderExists(bytes32)': '2cb77e9f',
		'quote(((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[]))':
			'e0e530b7',
		'removeOrder2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),((address,address,bytes),(address,uint256[],bytes)[])[])':
			'8d7b6beb',
		'supportsInterface(bytes4)': '01ffc9a7',
		'takeOrders2((uint256,uint256,uint256,((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[])[],bytes))':
			'0997c4a0',
		'vaultBalance(address,address,uint256)': 'd97b2e48',
		'withdraw2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])':
			'f513c42d'
	},
	rawMetadata:
		'{"compiler":{"version":"0.8.25+commit.b61c2a91"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"bytes32","name":"result","type":"bytes32"}],"name":"FlashLenderCallbackFailed","type":"error"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"InvalidSignature","type":"error"},{"inputs":[{"internalType":"uint256","name":"minimumInput","type":"uint256"},{"internalType":"uint256","name":"input","type":"uint256"}],"name":"MinimumInput","type":"error"},{"inputs":[],"name":"NoOrders","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"NotOrderOwner","type":"error"},{"inputs":[{"internalType":"bytes","name":"unmeta","type":"bytes"}],"name":"NotRainMetaV1","type":"error"},{"inputs":[],"name":"OrderNoHandleIO","type":"error"},{"inputs":[],"name":"OrderNoInputs","type":"error"},{"inputs":[],"name":"OrderNoOutputs","type":"error"},{"inputs":[],"name":"OrderNoSources","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"SameOwner","type":"error"},{"inputs":[{"internalType":"uint8","name":"aliceTokenDecimals","type":"uint8"},{"internalType":"uint8","name":"bobTokenDecimals","type":"uint8"}],"name":"TokenDecimalsMismatch","type":"error"},{"inputs":[{"internalType":"address","name":"aliceToken","type":"address"},{"internalType":"address","name":"bobToken","type":"address"}],"name":"TokenMismatch","type":"error"},{"inputs":[{"internalType":"uint256","name":"outputs","type":"uint256"}],"name":"UnsupportedCalculateOutputs","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"name":"ZeroDepositAmount","type":"error"},{"inputs":[],"name":"ZeroMaximumInput","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"name":"ZeroWithdrawTargetAmount","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"indexed":false,"internalType":"struct OrderV3","name":"order","type":"tuple"}],"name":"AddOrderV2","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"components":[{"internalType":"uint256","name":"aliceOutput","type":"uint256"},{"internalType":"uint256","name":"bobOutput","type":"uint256"},{"internalType":"uint256","name":"aliceInput","type":"uint256"},{"internalType":"uint256","name":"bobInput","type":"uint256"}],"indexed":false,"internalType":"struct ClearStateChange","name":"clearStateChange","type":"tuple"}],"name":"AfterClear","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"indexed":false,"internalType":"struct OrderV3","name":"alice","type":"tuple"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"indexed":false,"internalType":"struct OrderV3","name":"bob","type":"tuple"},{"components":[{"internalType":"uint256","name":"aliceInputIOIndex","type":"uint256"},{"internalType":"uint256","name":"aliceOutputIOIndex","type":"uint256"},{"internalType":"uint256","name":"bobInputIOIndex","type":"uint256"},{"internalType":"uint256","name":"bobOutputIOIndex","type":"uint256"},{"internalType":"uint256","name":"aliceBountyVaultId","type":"uint256"},{"internalType":"uint256","name":"bobBountyVaultId","type":"uint256"}],"indexed":false,"internalType":"struct ClearConfig","name":"clearConfig","type":"tuple"}],"name":"ClearV2","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256[][]","name":"context","type":"uint256[][]"}],"name":"Context","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"vaultId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bytes32","name":"subject","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"meta","type":"bytes"}],"name":"MetaV1_2","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"OrderExceedsMaxRatio","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"OrderNotFound","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"OrderZeroAmount","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"indexed":false,"internalType":"struct OrderV3","name":"order","type":"tuple"}],"name":"RemoveOrderV2","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"components":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"internalType":"struct OrderV3","name":"order","type":"tuple"},{"internalType":"uint256","name":"inputIOIndex","type":"uint256"},{"internalType":"uint256","name":"outputIOIndex","type":"uint256"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"signedContext","type":"tuple[]"}],"indexed":false,"internalType":"struct TakeOrderConfigV3","name":"config","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"input","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"output","type":"uint256"}],"name":"TakeOrderV2","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"vaultId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"targetAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"components":[{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"bytes32","name":"secret","type":"bytes32"},{"internalType":"bytes","name":"meta","type":"bytes"}],"internalType":"struct OrderConfigV3","name":"orderConfig","type":"tuple"},{"components":[{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"signedContext","type":"tuple[]"}],"internalType":"struct ActionV1[]","name":"post","type":"tuple[]"}],"name":"addOrder2","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"internalType":"struct OrderV3","name":"aliceOrder","type":"tuple"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"internalType":"struct OrderV3","name":"bobOrder","type":"tuple"},{"components":[{"internalType":"uint256","name":"aliceInputIOIndex","type":"uint256"},{"internalType":"uint256","name":"aliceOutputIOIndex","type":"uint256"},{"internalType":"uint256","name":"bobInputIOIndex","type":"uint256"},{"internalType":"uint256","name":"bobOutputIOIndex","type":"uint256"},{"internalType":"uint256","name":"aliceBountyVaultId","type":"uint256"},{"internalType":"uint256","name":"bobBountyVaultId","type":"uint256"}],"internalType":"struct ClearConfig","name":"clearConfig","type":"tuple"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"aliceSignedContext","type":"tuple[]"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"bobSignedContext","type":"tuple[]"}],"name":"clear2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"vaultId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"components":[{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"signedContext","type":"tuple[]"}],"internalType":"struct ActionV1[]","name":"post","type":"tuple[]"}],"name":"deposit2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"signedContext","type":"tuple[]"}],"internalType":"struct ActionV1[]","name":"post","type":"tuple[]"}],"name":"enact","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"flashFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"contract IERC3156FlashBorrower","name":"receiver","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flashLoan","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"maxFlashLoan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"orderExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"internalType":"struct OrderV3","name":"order","type":"tuple"},{"internalType":"uint256","name":"inputIOIndex","type":"uint256"},{"internalType":"uint256","name":"outputIOIndex","type":"uint256"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"signedContext","type":"tuple[]"}],"internalType":"struct Quote","name":"quoteConfig","type":"tuple"}],"name":"quote","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"internalType":"struct OrderV3","name":"order","type":"tuple"},{"components":[{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"signedContext","type":"tuple[]"}],"internalType":"struct ActionV1[]","name":"post","type":"tuple[]"}],"name":"removeOrder2","outputs":[{"internalType":"bool","name":"stateChanged","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"minimumInput","type":"uint256"},{"internalType":"uint256","name":"maximumInput","type":"uint256"},{"internalType":"uint256","name":"maximumIORatio","type":"uint256"},{"components":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validInputs","type":"tuple[]"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"internalType":"struct IO[]","name":"validOutputs","type":"tuple[]"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"internalType":"struct OrderV3","name":"order","type":"tuple"},{"internalType":"uint256","name":"inputIOIndex","type":"uint256"},{"internalType":"uint256","name":"outputIOIndex","type":"uint256"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"signedContext","type":"tuple[]"}],"internalType":"struct TakeOrderConfigV3[]","name":"orders","type":"tuple[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct TakeOrdersConfigV3","name":"config","type":"tuple"}],"name":"takeOrders2","outputs":[{"internalType":"uint256","name":"totalTakerInput","type":"uint256"},{"internalType":"uint256","name":"totalTakerOutput","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"vaultId","type":"uint256"}],"name":"vaultBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"vaultId","type":"uint256"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"components":[{"components":[{"internalType":"contract IInterpreterV3","name":"interpreter","type":"address"},{"internalType":"contract IInterpreterStoreV2","name":"store","type":"address"},{"internalType":"bytes","name":"bytecode","type":"bytes"}],"internalType":"struct EvaluableV3","name":"evaluable","type":"tuple"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256[]","name":"context","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct SignedContextV1[]","name":"signedContext","type":"tuple[]"}],"internalType":"struct ActionV1[]","name":"post","type":"tuple[]"}],"name":"withdraw2","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"errors":{"FlashLenderCallbackFailed(bytes32)":[{"params":{"result":"The value that was returned by `onFlashLoan`."}}],"MinimumInput(uint256,uint256)":[{"params":{"input":"The input that was achieved.","minimumInput":"The minimum input required."}}],"NotOrderOwner(address,address)":[{"params":{"owner":"The owner of the order.","sender":"`msg.sender` attempting to modify the order."}}],"NotRainMetaV1(bytes)":[{"params":{"unmeta":"the bytes that are not meta."}}],"SameOwner(address)":[{"params":{"owner":"The owner of both orders."}}],"TokenDecimalsMismatch(uint8,uint8)":[{"params":{"aliceTokenDecimals":"The input or output decimals of one order.","bobTokenDecimals":"The input or output decimals of the other order."}}],"TokenMismatch(address,address)":[{"params":{"aliceToken":"The input or output of one order.","bobToken":"The input or output of the other order that doesn\'t match a."}}],"UnsupportedCalculateOutputs(uint256)":[{"params":{"outputs":"The outputs the expression offers."}}],"ZeroDepositAmount(address,address,uint256)":[{"params":{"sender":"`msg.sender` depositing tokens.","token":"The token being deposited.","vaultId":"The vault ID the tokens are being deposited under."}}],"ZeroWithdrawTargetAmount(address,address,uint256)":[{"params":{"sender":"`msg.sender` withdrawing tokens.","token":"The token being withdrawn.","vaultId":"The vault ID the tokens are being withdrawn from."}}]},"events":{"AddOrderV2(address,bytes32,(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32))":{"params":{"order":"The newly added order. MUST be handed back as-is when clearing orders and contains derived information in addition to the order config that was provided by the order owner.","orderHash":"The hash of the order as it is recorded onchain. Only the hash is stored in Orderbook storage to avoid paying gas to store the entire order.","sender":"`msg.sender` adding the order and is owner of the order."}},"AfterClear(address,(uint256,uint256,uint256,uint256))":{"params":{"clearStateChange":"The final vault state changes from the clearance.","sender":"`msg.sender` clearing the order."}},"ClearV2(address,(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(uint256,uint256,uint256,uint256,uint256,uint256))":{"params":{"alice":"One of the orders.","bob":"The other order.","clearConfig":"Additional config required to process the clearance.","sender":"`msg.sender` clearing both orders."}},"Context(address,uint256[][])":{"params":{"context":"The context that was built.","sender":"`msg.sender` building the context."}},"Deposit(address,address,uint256,uint256)":{"params":{"amount":"The amount of tokens deposited.","sender":"`msg.sender` depositing tokens. Delegated deposits are NOT supported.","token":"The token being deposited.","vaultId":"The vault ID the tokens are being deposited under."}},"MetaV1_2(address,bytes32,bytes)":{"params":{"meta":"Rain metadata V1 compliant metadata bytes. https://github.com/rainprotocol/specs/blob/main/metadata-v1.md","sender":"The msg.sender.","subject":"The entity that the metadata is about. MAY be the address of the emitting contract (as `bytes32`) OR anything else. The interpretation of the subject is context specific, so will often be a hash of some data/thing that this metadata is about."}},"OrderExceedsMaxRatio(address,address,bytes32)":{"params":{"orderHash":"Hash of the order that had an excess ratio.","owner":"Owner of the order that had an excess ratio.","sender":"`msg.sender` clearing the order that had an excess ratio."}},"OrderNotFound(address,address,bytes32)":{"params":{"orderHash":"Hash of the order that was not found.","owner":"Owner of the order that was not found.","sender":"`msg.sender` clearing the order that wasn\'t found."}},"OrderZeroAmount(address,address,bytes32)":{"params":{"orderHash":"Hash of the order that evaluated to a 0 amount.","owner":"Owner of the order that evaluated to a 0 amount.","sender":"`msg.sender` clearing the order that had a 0 amount."}},"RemoveOrderV2(address,bytes32,(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32))":{"params":{"order":"The removed order.","orderHash":"The hash of the removed order.","sender":"`msg.sender` removing the order and is owner of the order."}},"TakeOrderV2(address,((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[]),uint256,uint256)":{"params":{"config":"All config defining the orders to attempt to take.","input":"The input amount from the perspective of sender.","output":"The output amount from the perspective of sender.","sender":"`msg.sender` taking the orders."}},"Withdraw(address,address,uint256,uint256,uint256)":{"params":{"amount":"The amount of tokens withdrawn, can be less than the target amount if the vault does not have the funds available to cover the target amount. For example an active order might move tokens before the withdraw completes.","sender":"`msg.sender` withdrawing tokens. Delegated withdrawals are NOT supported.","targetAmount":"The amount of tokens requested to withdraw.","token":"The token being withdrawn.","vaultId":"The vault ID the tokens are being withdrawn from."}}},"kind":"dev","methods":{"addOrder2(((address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32,bytes32,bytes),((address,address,bytes),(address,uint256[],bytes)[])[])":{"params":{"config":"All config required to build an `Order`.","post":"Additional actions to run after the order is added. Order information SHOULD be made available during evaluation in context. If ANY of the post evaluables revert, the order MUST NOT be added."},"returns":{"_0":"True if the order was added, false if it already existed."}},"clear2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(uint256,uint256,uint256,uint256,uint256,uint256),(address,uint256[],bytes)[],(address,uint256[],bytes)[])":{"params":{"alice":"Some order to clear.","aliceSignedContext":"Optional signed context that is relevant to A.","bob":"Another order to clear.","bobSignedContext":"Optional signed context that is relevant to B.","clearConfig":"Additional configuration for the clearance such as how to handle the bounty payment for the `msg.sender`."}},"deposit2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])":{"params":{"amount":"The amount of tokens to deposit.","post":"Additional actions to run after the deposit. Deposit information SHOULD be made available during evaluation in context. If ANY of the post actions revert, the deposit MUST be reverted.","token":"The token to deposit.","vaultId":"The vault ID to deposit under."}},"flashFee(address,uint256)":{"details":"The fee to be charged for a given loan.","params":{"amount":"The amount of tokens lent.","token":"The loan currency."},"returns":{"_0":"The amount of `token` to be charged for the loan, on top of the returned principal."}},"flashLoan(address,address,uint256,bytes)":{"details":"Initiate a flash loan.","params":{"amount":"The amount of tokens lent.","data":"Arbitrary data structure, intended to contain user-defined parameters.","receiver":"The receiver of the tokens in the loan, and the receiver of the callback.","token":"The loan currency."}},"maxFlashLoan(address)":{"details":"The amount of currency available to be lent.","params":{"token":"The loan currency."},"returns":{"_0":"The amount of `token` that can be borrowed."}},"multicall(bytes[])":{"custom:oz-upgrades-unsafe-allow-reachable":"delegatecall","details":"Receives and executes a batch of function calls on this contract."},"orderExists(bytes32)":{"params":{"orderHash":"The hash of the order to check."},"returns":{"_0":"True if the order exists, false otherwise."}},"quote(((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[]))":{"params":{"quoteConfig":"The configuration for the quote."},"returns":{"_0":"True if the order exists, false otherwise.","_1":"The maximum output amount that the order could send. Is `0` if the order does not exist.","_2":"The input:output ratio of the order. Is `0` if the order does not exist."}},"removeOrder2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),((address,address,bytes),(address,uint256[],bytes)[])[])":{"params":{"order":"The `Order` data exactly as it was added.","post":"Additional actions to run after the order is removed. Order information SHOULD be made available during evaluation in context. If ANY of the post evaluables revert, the order MUST NOT be removed."},"returns":{"stateChanged":"True if the order was removed, false if it did not exist."}},"supportsInterface(bytes4)":{"details":"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created. This function call must use less than 30 000 gas."},"takeOrders2((uint256,uint256,uint256,((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[])[],bytes))":{"params":{"config":"The constraints and list of orders to take, orders are processed sequentially in order as provided, there is NO ATTEMPT onchain to predict/filter/sort these orders other than evaluating them as provided. Inputs and outputs are from the perspective of `msg.sender` except for values specified by the orders themselves which are the from the perspective of that order."},"returns":{"totalTakerInput":"Total tokens sent to `msg.sender`, taken from order vaults processed.","totalTakerOutput":"Total tokens taken from `msg.sender` and distributed between vaults."}},"vaultBalance(address,address,uint256)":{"params":{"owner":"The owner of the vault.","token":"The token the vault is for.","vaultId":"The vault ID to read."},"returns":{"_0":"The current balance of the vault."}},"withdraw2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])":{"params":{"post":"Additional actions to run after the withdraw. Withdraw information SHOULD be made available during evaluation in context. If ANY of the post evaluables revert, the withdraw MUST be reverted.","targetAmount":"The amount of tokens to attempt to withdraw. MAY result in fewer tokens withdrawn if the vault balance is lower than the target amount. MAY NOT be zero, the order book MUST revert with `ZeroWithdrawTargetAmount` if the amount is zero.","token":"The token to withdraw.","vaultId":"The vault ID to withdraw from."}}},"stateVariables":{"sVaultBalances":{"details":"Vault balances are stored in a mapping of owner => token => vault ID This gives 1:1 parity with the `IOrderBookV1` interface but keeping the `sFoo` naming convention for storage variables."}},"title":"OrderBook See `IOrderBookV1` for more documentation.","version":1},"userdoc":{"errors":{"FlashLenderCallbackFailed(bytes32)":[{"notice":"Thrown when the `onFlashLoan` callback returns anything other than ON_FLASH_LOAN_CALLBACK_SUCCESS."}],"InvalidSignature(uint256)":[{"notice":"Thrown when the ith signature from a list of signed contexts is invalid."}],"MinimumInput(uint256,uint256)":[{"notice":"Thrown when the minimum input is not met."}],"NoOrders()":[{"notice":"Thrown when take orders is called with no orders."}],"NotOrderOwner(address,address)":[{"notice":"Thrown when the `msg.sender` modifying an order is not its owner."}],"NotRainMetaV1(bytes)":[{"notice":"Thrown when some bytes are expected to be rain meta and are not."}],"OrderNoHandleIO()":[{"notice":"MUST be thrown by `addOrder` if the order has no associated handle IO."}],"OrderNoInputs()":[{"notice":"MUST be thrown by `addOrder` if the order has no inputs."}],"OrderNoOutputs()":[{"notice":"MUST be thrown by `addOrder` if the order has no outputs."}],"OrderNoSources()":[{"notice":"MUST be thrown by `addOrder` if the order has no associated calculation."}],"SameOwner(address)":[{"notice":"Thrown when two orders have the same owner during clear."}],"TokenDecimalsMismatch(uint8,uint8)":[{"notice":"Thrown when the input and output token decimals don\'t match, in either direction."}],"TokenMismatch(address,address)":[{"notice":"Thrown when the input and output tokens don\'t match, in either direction."}],"UnsupportedCalculateOutputs(uint256)":[{"notice":"Thrown when calculate order expression offers too few outputs."}],"ZeroDepositAmount(address,address,uint256)":[{"notice":"MUST be thrown by `deposit` if the amount is zero."}],"ZeroMaximumInput()":[{"notice":"Thrown when take orders is called with a zero maximum input."}],"ZeroWithdrawTargetAmount(address,address,uint256)":[{"notice":"MUST be thrown by `withdraw` if the amount _requested_ to withdraw is zero. The withdrawal MAY still not move any tokens if the vault balance is zero, or the withdrawal is used to repay a flash loan."}]},"events":{"AddOrderV2(address,bytes32,(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32))":{"notice":"An order has been added to the orderbook. The order is permanently and always active according to its expression until/unless it is removed."},"AfterClear(address,(uint256,uint256,uint256,uint256))":{"notice":"Emitted after two orders clear. Includes all final state changes in the vault balances, including the clearer\'s vaults."},"ClearV2(address,(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(uint256,uint256,uint256,uint256,uint256,uint256))":{"notice":"Emitted before two orders clear. Covers both orders and includes all the state before anything is calculated."},"Context(address,uint256[][])":{"notice":"Calling contracts SHOULD emit `Context` before calling `eval3` if they are able. Notably `eval3` MAY be called within a static call which means that events cannot be emitted, in which case this does not apply. It MAY NOT be useful to emit this multiple times for several eval calls if they all share a common context, in which case a single emit is sufficient."},"Deposit(address,address,uint256,uint256)":{"notice":"Some tokens have been deposited to a vault."},"MetaV1_2(address,bytes32,bytes)":{"notice":"An onchain wrapper to carry arbitrary Rain metadata. Assigns the sender to the metadata so that tooling can easily drop/ignore data from unknown sources. As metadata is about something, the subject MUST be provided."},"OrderExceedsMaxRatio(address,address,bytes32)":{"notice":"Emitted when an order evaluates to a ratio exceeding the counterparty\'s maximum limit. An error rather than an error so that we allow attempting many orders in a loop and NOT rollback on a \\"best effort\\" basis to clear."},"OrderNotFound(address,address,bytes32)":{"notice":"Emitted when attempting to match an order that either never existed or was removed. An event rather than an error so that we allow attempting many orders in a loop and NOT rollback on \\"best effort\\" basis to clear."},"OrderZeroAmount(address,address,bytes32)":{"notice":"Emitted when an order evaluates to a zero amount. An event rather than an error so that we allow attempting many orders in a loop and NOT rollback on a \\"best effort\\" basis to clear."},"RemoveOrderV2(address,bytes32,(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32))":{"notice":"An order has been removed from the orderbook. This effectively deactivates it. Orders can be added again after removal."},"TakeOrderV2(address,((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[]),uint256,uint256)":{"notice":"Some order has been taken by `msg.sender`. This is the same as them placing inverse orders then immediately clearing them all, but costs less gas and is more convenient and reliable. Analogous to a market buy against the specified orders. Each order that is matched within a the `takeOrders` loop emits its own individual event."},"Withdraw(address,address,uint256,uint256,uint256)":{"notice":"Some tokens have been withdrawn from a vault."}},"kind":"user","methods":{"addOrder2(((address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32,bytes32,bytes),((address,address,bytes),(address,uint256[],bytes)[])[])":{"notice":"Given an order config, deploys the expression and builds the full `Order` for the config, then records it as an active order. Delegated adding an order is NOT supported. The `msg.sender` that adds an order is ALWAYS the owner and all resulting vault movements are their own. MUST revert with `OrderNoSources` if the order has no associated calculation and `OrderNoHandleIO` if the order has no handle IO entrypoint. The calculation MUST return at least two values from evaluation, the maximum amount and the IO ratio. The handle IO entrypoint SHOULD return zero values from evaluation. Either MAY revert during evaluation on the interpreter, which MUST prevent the order from clearing. MUST revert with `OrderNoInputs` if the order has no inputs. MUST revert with `OrderNoOutputs` if the order has no outputs. If the order already exists, the order book MUST NOT change state, which includes not emitting an event. Instead it MUST return false. If the order book modifies state it MUST emit an `AddOrder` event and return true."},"clear2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(uint256,uint256,uint256,uint256,uint256,uint256),(address,uint256[],bytes)[],(address,uint256[],bytes)[])":{"notice":"Allows `msg.sender` to match two live orders placed earlier by non-interactive parties and claim a bounty in the process. The clearer is free to select any two live orders on the order book for matching and as long as they have compatible tokens, ratios and amounts, the orders will clear. Clearing the orders DOES NOT remove them from the orderbook, they remain live until explicitly removed by their owner. Even if the input vault balances are completely emptied, the orders remain live until removed. This allows order owners to deploy a strategy over a long period of time and periodically top up the input vaults. Clearing two orders from the same owner is disallowed. Any mismatch in the ratios between the two orders will cause either more inputs than there are available outputs (transaction will revert) or less inputs than there are available outputs. In the latter case the excess outputs are given to the `msg.sender` of clear, to the vaults they specify in the clear config. This not only incentivises \\"automatic\\" clear calls for both alice and bob, but incentivises _prioritising greater ratio differences_ with a larger bounty. The second point is important because it implicitly prioritises orders that are further from the current market price, thus putting constant increasing pressure on the entire system the further it drifts from the norm, no matter how esoteric the individual order expressions and sizings might be. All else equal there are several factors that would impact how reliably some order clears relative to the wider market, such as: - Bounties are effectively percentages of cleared amounts so larger   orders have larger bounties and cover gas costs more easily - High gas on the network means that orders are harder to clear   profitably so the negative spread of the ratios will need to be larger - Complex and stateful expressions cost more gas to evalulate so the   negative spread will need to be larger - Erratic behavior of the order owner could reduce the willingness of   third parties to interact if it could result in wasted gas due to   orders suddently being removed before clearance etc. - Dynamic and highly volatile words used in the expression could be   ignored or low priority by clearers who want to be sure that they can   accurately predict the ratios that they include in their clearance - Geopolitical issues such as sanctions and regulatory restrictions could   cause issues for certain owners and clearers"},"deposit2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])":{"notice":"Vault IDs are namespaced by the token address so there is no risk of collision between tokens. For example, vault ID 0 for token A is completely different to vault ID 0 for token B. `0` amount deposits are unsupported as underlying token contracts handle `0` value transfers differently and this would be a source of confusion. The order book MUST revert with `ZeroDepositAmount` if the amount is zero."},"enact(((address,address,bytes),(address,uint256[],bytes)[])[])":{"notice":"`msg.sender` enacts the provided actions. This DOES NOT return any values, and MUST NOT modify any vault balances. Presumably the expressions will modify some internal state associated with active orders. If ANY of the expressions revert, the entire transaction MUST revert."},"maxFlashLoan(address)":{"notice":"There\'s no limit to the size of a flash loan from `Orderbook` other than the current tokens deposited in `Orderbook`. If there is an active debt then loans are disabled so the max becomes `0` until after repayment."},"orderExists(bytes32)":{"notice":"Returns true if the order exists, false otherwise."},"quote(((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[]))":{"notice":"Quotes the provided order for the caller. The caller is considered to be the counterparty to the order, for the purposes of evaluating the quote. However, the caller\'s vault balances and/or tokens in wallet are not considered in the quote. This means the output max can exceed what the caller could actually pay for. Both the output max and io ratio are returned as 18 decimal fixed point values, ignoring any token decimals, so are not the literal amounts that would be moved in the order were it to clear."},"removeOrder2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),((address,address,bytes),(address,uint256[],bytes)[])[])":{"notice":"Order owner can remove their own orders. Delegated order removal is NOT supported and will revert. Removing an order multiple times or removing an order that never existed are valid, the event will be emitted and the transaction will complete with that order hash definitely, redundantly not live."},"takeOrders2((uint256,uint256,uint256,((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[])[],bytes))":{"notice":"Allows `msg.sender` to attempt to fill a list of orders in sequence without needing to place their own order and clear them. This works like a market buy but against a specific set of orders. Every order will looped over and calculated individually then filled maximally until the request input is reached for the `msg.sender`. The `msg.sender` is responsible for selecting the best orders at the time according to their criteria and MAY specify a maximum IO ratio to guard against an order spiking the ratio beyond what the `msg.sender` expected and is comfortable with. As orders may be removed and calculate their ratios dynamically, all issues fulfilling an order other than misconfiguration by the `msg.sender` are no-ops and DO NOT revert the transaction. This allows the `msg.sender` to optimistically provide a list of orders that they aren\'t sure will completely fill at a good price, and fallback to more reliable orders further down their list. Misconfiguration such as token mismatches are errors that revert as this is known and static at all times to the `msg.sender` so MUST be provided correctly. `msg.sender` MAY specify a minimum input that MUST be reached across all orders in the list, otherwise the transaction will revert, this MAY be set to zero. Exactly like withdraw, if there is an active flash loan for `msg.sender` they will have their outstanding loan reduced by the final input amount preferentially before sending any tokens. Notably this allows arb bots implemented as flash loan borrowers to connect orders against external liquidity directly by paying back the loan with a `takeOrders` call and outputting the result of the external trade. Rounding errors always favour the order never the `msg.sender`."},"vaultBalance(address,address,uint256)":{"notice":"Get the current balance of a vault for a given owner, token and vault ID."},"withdraw2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])":{"notice":"Allows the sender to withdraw any tokens from their own vaults. If the withrawer has an active flash loan debt denominated in the same token being withdrawn then Orderbook will merely reduce the debt and NOT send the amount of tokens repaid to the flashloan debt. MUST revert if the amount _requested_ to withdraw is zero. The withdrawal MAY still not move any tokens (without revert) if the vault balance is zero, or the withdrawal is used to repay a flash loan, or due to any other internal accounting."}},"version":1}},"settings":{"compilationTarget":{"src/concrete/ob/OrderBook.sol":"OrderBook"},"evmVersion":"cancun","libraries":{},"metadata":{"appendCBOR":false,"bytecodeHash":"none"},"optimizer":{"enabled":true,"runs":1000000},"remappings":[":@prb/test/=lib/rain.interpreter/lib/prb-math/lib/prb-test/src/",":axelar-gmp-sdk-solidity/=lib/sushixswap-v2/lib/axelar-gmp-sdk-solidity/",":bytecode/=lib/rain.interpreter/lib/rain.interpreter.interface/src/lib/bytecode/",":caller/=lib/rain.interpreter/lib/rain.interpreter.interface/src/lib/caller/",":constants/=lib/rain.interpreter/src/lib/constants/",":deprecated/=lib/rain.interpreter/lib/rain.interpreter.interface/src/lib/",":ds-test/=lib/rain.solmem/lib/forge-std/lib/ds-test/src/",":erc4626-tests/=lib/rain.interpreter/lib/openzeppelin-contracts/lib/erc4626-tests/",":eval/=lib/rain.interpreter/src/lib/eval/",":extern/=lib/rain.interpreter/src/lib/extern/",":forge-gas-snapshot/=lib/sushixswap-v2/lib/forge-gas-snapshot/src/",":forge-std/=lib/rain.interpreter/lib/rain.interpreter.interface/lib/forge-std/src/",":integrity/=lib/rain.interpreter/src/lib/integrity/",":ns/=lib/rain.interpreter/lib/rain.interpreter.interface/src/lib/ns/",":op/=lib/rain.interpreter/src/lib/op/",":openzeppelin-contracts/=lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/",":openzeppelin/=lib/rain.interpreter/lib/openzeppelin-contracts/contracts/",":parse/=lib/rain.interpreter/src/lib/parse/",":prb-math/=lib/rain.interpreter/lib/prb-math/src/",":prb-test/=lib/rain.interpreter/lib/prb-math/lib/prb-test/src/",":rain.chainlink/=lib/rain.interpreter/lib/rain.chainlink/src/",":rain.datacontract/=lib/rain.interpreter/lib/rain.datacontract/src/",":rain.erc1820/=lib/rain.erc1820/src/",":rain.interpreter.interface/=lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/",":rain.interpreter/=lib/rain.interpreter/src/",":rain.intorastring/=lib/rain.interpreter/lib/rain.intorastring/",":rain.lib.hash/=lib/rain.lib.memkv/lib/rain.lib.hash/src/",":rain.lib.memkv/=lib/rain.lib.memkv/src/",":rain.lib.typecast/=lib/rain.interpreter/lib/rain.lib.typecast/src/",":rain.math.binary/=lib/rain.interpreter/lib/rain.math.binary/src/",":rain.math.fixedpoint/=lib/rain.interpreter/lib/rain.math.fixedpoint/src/",":rain.math.float/=lib/rain.interpreter/lib/rain.math.float/",":rain.math.saturating/=lib/rain.interpreter/lib/rain.math.fixedpoint/lib/rain.math.saturating/src/",":rain.metadata/=lib/rain.interpreter/lib/rain.metadata/src/",":rain.orderbook.interface/=lib/rain.orderbook.interface/src/",":rain.sol.codegen/=lib/rain.interpreter/lib/rain.sol.codegen/src/",":rain.solmem/=lib/rain.solmem/src/",":sol.lib.binmaskflag/=lib/rain.interpreter/lib/sol.lib.binmaskflag/src/",":state/=lib/rain.interpreter/src/lib/state/",":sushixswap-v2/=lib/sushixswap-v2/"]},"sources":{"lib/rain.interpreter/lib/rain.math.fixedpoint/src/error/ErrScale.sol":{"keccak256":"0x5ece50469527887cae518ba34668bfc4130fa5bc37af1fd5f410b0c17d5eb17d","license":"CAL","urls":["bzz-raw://a00a185f18618c47658ab0c340afe73cc7fabca41b133f1ad24bc5f2ca58be2f","dweb:/ipfs/QmZhJAghxAYuvpCiMLR1vqyNhbZWycT2eP24NCAH4esu98"]},"lib/rain.interpreter/lib/rain.math.fixedpoint/src/lib/FixedPointDecimalConstants.sol":{"keccak256":"0x65be2b379168a3efb169e05a31c4e9e60d6f1ff15352366224c98dadced64785","license":"CAL","urls":["bzz-raw://3c559b2dc57ff47bbe0c7adfb016a1db4291540bc270d5e0dbaa9004d2f2c33b","dweb:/ipfs/QmaXXEnHnrbCXWogGw3mM1vQJytzeZG9sMccq4dCdiG1hK"]},"lib/rain.interpreter/lib/rain.math.fixedpoint/src/lib/LibFixedPointDecimalArithmeticOpenZeppelin.sol":{"keccak256":"0x86c67ba3f7c2131b662bec27aa20487249e97a7f2f6b62a594d4137f81eefec8","license":"CAL","urls":["bzz-raw://1450bedea26b064197713bbdfa6e07acb3f6e5d6bc66faa50511ec99163722a5","dweb:/ipfs/QmbWGmzaLar3iWCzfy2TjYcrVSowBPj84qNrpFyS4D1FDE"]},"lib/rain.interpreter/lib/rain.math.fixedpoint/src/lib/LibFixedPointDecimalScale.sol":{"keccak256":"0xf66ad9cd424e1d93e87d8701c7382f7185bb986f3579e09e458aeda4d53415c7","license":"CAL","urls":["bzz-raw://411bcbcd63860e2f72f2f2c6b76ab27439f6d3013dff410549d2b3458f59a4de","dweb:/ipfs/QmcEvxmPDZCr39b5gcs8S2h2VWYkQgeGWBTo6mPDUuLvLJ"]},"lib/rain.interpreter/lib/rain.metadata/src/interface/deprecated/IMetaV1.sol":{"keccak256":"0x7c13c3885716aaa55baa3af8f1eb62548613cf16a73839380f420980491b9b6a","license":"CAL","urls":["bzz-raw://633e3365a59c38cb17fdfe79866f6645b578666cab3f13f1bc737ac48440786f","dweb:/ipfs/QmPprM1VpJg5y9BjxY1VysL4WeipbGVLJ9AneG9z1RzXp5"]},"lib/rain.interpreter/lib/rain.metadata/src/interface/unstable/IMetaV1_2.sol":{"keccak256":"0x7ecb17679434cc8e75190d175ef58aff4fdfe612620df0a70ed2e9bafe19a771","license":"CAL","urls":["bzz-raw://9071b0211ba736c95de63aa7b0df56f60d89d26b56f9a7a27a34593e07fe5040","dweb:/ipfs/QmYCh49wVL6kp3AQ99HxiLhbiHEB3JLtEc6tEqJnQtyEZL"]},"lib/rain.interpreter/lib/rain.metadata/src/lib/LibMeta.sol":{"keccak256":"0x5d339ca4b4d1326108c3b0aaae04294cb86645239629a947fe5cb08ffb95b78f","license":"CAL","urls":["bzz-raw://14d198a3ca2bcdc0cf45729f6e85f4dd0eb7ef94c378a653da24c55c08f0301d","dweb:/ipfs/QmddA19AaGT38oRkQDyrRQEGe8XffZCTML36m4FxUGx2B3"]},"lib/rain.lib.memkv/lib/rain.lib.hash/src/LibHashNoAlloc.sol":{"keccak256":"0x52c8b6906d61bcc7e70d594cb097f53e361569904e27019ebeed0b4c94d2aed8","license":"CAL","urls":["bzz-raw://62999b0afefbe97e1d41c2c57b67a186e5a1618758f8f9cf17776c1d67f27d24","dweb:/ipfs/QmfVsV2CVp91F9dHNWziKvSo54Wgb84k5Ct7Rtxxyptw35"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/interfaces/IERC1271.sol":{"keccak256":"0x0705a4b1b86d7b0bd8432118f226ba139c44b9dcaba0a6eafba2dd7d0639c544","license":"MIT","urls":["bzz-raw://c45b821ef9e882e57c256697a152e108f0f2ad6997609af8904cae99c9bd422e","dweb:/ipfs/QmRKCJW6jjzR5UYZcLpGnhEJ75UVbH6EHkEa49sWx2SKng"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol":{"keccak256":"0xa535a5df777d44e945dd24aa43a11e44b024140fc340ad0dfe42acf4002aade1","license":"MIT","urls":["bzz-raw://41319e7f621f2dc3733511332c4fd032f8e32ad2aa7fd6f665c19741d9941a34","dweb:/ipfs/QmcYR3bd862GD1Bc7jwrU9bGxrhUu5na1oP964bDCu2id1"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0x287b55befed2961a7eabd7d7b1b2839cbca8a5b80ef8dcbb25ed3d4c2002c305","license":"MIT","urls":["bzz-raw://bd39944e8fc06be6dbe2dd1d8449b5336e23c6a7ba3e8e9ae5ae0f37f35283f5","dweb:/ipfs/QmPV3FGYjVwvKSgAXKUN3r9T9GwniZz83CxBpM7vyj2G53"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol":{"keccak256":"0xb264c03a3442eb37a68ad620cefd1182766b58bee6cec40343480392d6b14d69","license":"MIT","urls":["bzz-raw://28879d01fd22c07b44f006612775f8577defbe459cb01685c5e25cd518c91a71","dweb:/ipfs/QmVgfkwv2Fxw6hhTcDUZhE7NkoSKjab3ipM7UaRbt6uXb5"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol":{"keccak256":"0xabefac93435967b4d36a4fabcbdbb918d1f0b7ae3c3d85bc30923b326c927ed1","license":"MIT","urls":["bzz-raw://9d213d3befca47da33f6db0310826bcdb148299805c10d77175ecfe1d06a9a68","dweb:/ipfs/QmRgCn6SP1hbBkExUADFuDo8xkT4UU47yjNF5FhCeRbQmS"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/Address.sol":{"keccak256":"0x006dd67219697fe68d7fbfdea512e7c4cb64a43565ed86171d67e844982da6fa","license":"MIT","urls":["bzz-raw://2455248c8ddd9cc6a7af76a13973cddf222072427e7b0e2a7d1aff345145e931","dweb:/ipfs/QmfYjnjRbWqYpuxurqveE6HtzsY1Xx323J428AKQgtBJZm"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/Context.sol":{"keccak256":"0xa92e4fa126feb6907daa0513ddd816b2eb91f30a808de54f63c17d0e162c3439","license":"MIT","urls":["bzz-raw://a367861093b74443b137564d3f3c472f70bcf114739e62059c939f25e315706c","dweb:/ipfs/Qmd7JMpcxD9RuQjK3uM3EzJUgSqdN8vzp8eytEiuwxQJ6h"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/Multicall.sol":{"keccak256":"0xebb546d772e9adda99ec85b6224bcbfb2a1238f26bd2e0f9610e7eff580e4aa0","license":"MIT","urls":["bzz-raw://acbb946122013b140ec5157ac80346956d74774c7ea721e0058f305de03a7151","dweb:/ipfs/QmaYmWD5pGLhD4SbL4we44rLCGym2tLgdUf3E9vjgZHg9b"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0x3088eb2868e8d13d89d16670b5f8612c4ab9ff8956272837d8e90106c59c14a0","license":"MIT","urls":["bzz-raw://b81d9ff6559ea5c47fc573e17ece6d9ba5d6839e213e6ebc3b4c5c8fe4199d7f","dweb:/ipfs/QmPCW1bFisUzJkyjroY3yipwfism9RRCigCcK1hbXtVM8n"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol":{"keccak256":"0x809bc3edb4bcbef8263fa616c1b60ee0004b50a8a1bfa164d8f57fd31f520c58","license":"MIT","urls":["bzz-raw://8b93a1e39a4a19eba1600b92c96f435442db88cac91e315c8291547a2a7bcfe2","dweb:/ipfs/QmTm34KVe6uZBZwq8dZDNWwPcm24qBJdxqL3rPxBJ4LrMv"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/cryptography/SignatureChecker.sol":{"keccak256":"0x3af3ca86df39aac39a0514c84459d691434a108d2151c8ce9d69f32e315cab80","license":"MIT","urls":["bzz-raw://77d1f1cf302cd5e1dfbbb4ce3b281b28e8c52942d4319fce43df2e1b6f02a52d","dweb:/ipfs/QmT6ZXStmK3Knhh9BokeVHQ9HXTBZNgL3Eb1ar1cYg1hWy"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol":{"keccak256":"0xd10975de010d89fd1c78dc5e8a9a7e7f496198085c151648f20cba166b32582b","license":"MIT","urls":["bzz-raw://fb0048dee081f6fffa5f74afc3fb328483c2a30504e94a0ddd2a5114d731ec4d","dweb:/ipfs/QmZptt1nmYoA5SgjwnSgWqgUSDgm4q52Yos3xhnMv3MV43"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol":{"keccak256":"0x447a5f3ddc18419d41ff92b3773fb86471b1db25773e07f877f548918a185bf1","license":"MIT","urls":["bzz-raw://be161e54f24e5c6fae81a12db1a8ae87bc5ae1b0ddc805d82a1440a68455088f","dweb:/ipfs/QmP7C3CHdY9urF4dEMb9wmsp1wMxHF6nhA2yQE5SKiPAdy"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xe4455ac1eb7fc497bb7402579e7b4d64d928b846fce7d2b6fde06d366f21c2b3","license":"MIT","urls":["bzz-raw://cc8841b3cd48ad125e2f46323c8bad3aa0e88e399ec62acb9e57efa7e7c8058c","dweb:/ipfs/QmSqE4mXHA2BXW58deDbXE8MTcsL5JSKNDbm23sVQxRLPS"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xf92515413956f529d95977adc9b0567d583c6203fc31ab1c23824c35187e3ddc","license":"MIT","urls":["bzz-raw://c50fcc459e49a9858b6d8ad5f911295cb7c9ab57567845a250bf0153f84a95c7","dweb:/ipfs/QmcEW85JRzvDkQggxiBBLVAasXWdkhEysqypj9EaB6H2g6"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/error/ErrBytecode.sol":{"keccak256":"0x9ae3ff0ab3c2982996fde4405282b3c417133b8294afc75d0680b6e40185e326","license":"CAL","urls":["bzz-raw://00baa931a3f9f40ac362114908f3ef5e0dd790db14d198c9eea1340905cdbefc","dweb:/ipfs/QmPYF6ENnnGxpvMJXKHrbmvVdXkpvkkT4FoCBCDU1HajST"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/IInterpreterCallerV3.sol":{"keccak256":"0xd818d3b51e603656679d845d486d94ab9784a209efd198dd0547816a642afa24","license":"CAL","urls":["bzz-raw://7a03211d646bbdc28eb3b8fcbf22a183c315fbded26c4dfc4f5e95a8380f85be","dweb:/ipfs/QmbtHUoAtrqbcCYPmPVoxwawiYJcqpmjfA4y5BqxfBCHkN"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/IInterpreterStoreV2.sol":{"keccak256":"0xfd1df694f4dcf8b21df8d67716c84bad592fabef2a5e24728264d95b5ecc23bc","license":"CAL","urls":["bzz-raw://ddf4359ede27b9ed71d6440ea947bd69e98e1e0498de4552738a8acafbf83165","dweb:/ipfs/QmPVdhTyPgUP6b1GrDVhiCZ2459nhzA4H9FNdJ5LjJ53ik"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/IInterpreterV3.sol":{"keccak256":"0xa4af4c32d8f6dc7e52c8ebf812b67a1909f2920df6e6e9795af041d2be991cbf","license":"CAL","urls":["bzz-raw://a567ff304ecdbb9356147136c4a2a776cda345deeecce5f9d41e2beed202943a","dweb:/ipfs/QmVN8SHkgqemVgRJiEMPGB6sXPTDWWGk1SfKjcXNPj4QBE"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/IParserV2.sol":{"keccak256":"0xef68ad9d16ae38ece9d4effb6682b2e6ba56167a3ef36f2c71c0a86f4e7d60a6","license":"CAL","urls":["bzz-raw://8162ce3646b52d8f271eca1c122351bb23989032f2734675822f84d5b6a31b69","dweb:/ipfs/QmZPxxmKdLeNuJNiHcbzGs4BDYiDjabYjRj5PfRr2YTYsp"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IExpressionDeployerV1.sol":{"keccak256":"0x2a001152546ab44208a126f1f518da086d6d6e2310db6b987d58cf8731c5eab0","license":"CAL","urls":["bzz-raw://aa1bd59abdb21d8c16945b057e73a0d19e5d7ab910630dd91cadc195c9c705e3","dweb:/ipfs/QmPHbu9bpS7L8MoUSRH7PWpvcVe4zinxTn8LCkGroiXasc"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IExpressionDeployerV2.sol":{"keccak256":"0x2b8e9d48c92c2c0e874fb4d073b0cb013fb36a830e16c68657bcf65ede7d8b16","license":"CAL","urls":["bzz-raw://8de383c71dcaabb32fd9b91912bc7cba001a5a89c6f5de08b1a92447d0bebd12","dweb:/ipfs/QmV1JV5ctH9cktJbYJxXvBNBePshfVB58voEUMCbgCtkhj"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IExpressionDeployerV3.sol":{"keccak256":"0x4e7b54e9345625d091c0c80a5cd7e1cd5e56d4a8cd3c5ec3420c638ebb5797fb","license":"CAL","urls":["bzz-raw://9e99b981214398be41e07a2e1ed403c394ea4916c6cfd3e614be1c1e9257fa11","dweb:/ipfs/QmfXP4KxyzQgfcBeL6N2uLRRDnWoZDtU28DMQ7VFgxBhWk"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterCallerV1.sol":{"keccak256":"0xb6be0766bb6f4021809b81a4f35cc43bfbceaa5e1bef6484c000d059e24e33a8","license":"CAL","urls":["bzz-raw://a9458880e68a3c6348ef10ba9de1b8942316828b8b5012bd7d20a473b69115a8","dweb:/ipfs/QmbmsXPGYmPmdVTyZGWWWypvc3e1Qqw2gyTnwajBzjFsfu"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterCallerV2.sol":{"keccak256":"0x65b2d484f373225f539e694a8706b45fa4da96d3aa7ae24d48cecc03e9a62895","license":"CAL","urls":["bzz-raw://bee43df581fc023bcba28a05602781d6ae3a752c10fc959bf821b2ba5425b2f3","dweb:/ipfs/QmbyiLfjw3khhuRojPU9UFM5CPud5gp4YCdeump7BpptVm"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterStoreV1.sol":{"keccak256":"0x4e03ec42747b2ce6bed9f522ab11bd555f9831e39b45cb9dcbf601554ce50fb9","license":"CAL","urls":["bzz-raw://ff1978aac681dafee36aa7bc4b2470e2da5c9bc205f50f1e0fbfef9bcc75e0e9","dweb:/ipfs/QmeK9q4soBCywAvtMMiw1AfJP9BYarVGNzmBaSQcQ33wMd"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterV1.sol":{"keccak256":"0xcb53d0989403dbde29b4a7791ae42579f6ece55d76c5b8a18025ff1308175957","license":"CAL","urls":["bzz-raw://af4421c4406774b7a43c2cccae974d98c84c427a108cd1af0e364b39f32c604a","dweb:/ipfs/Qma7HTFnZ3PNZQNk3Mz2pvG2U6EWwXDfSBx5yVv1HUUUZy"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterV2.sol":{"keccak256":"0xf61949cde075def994d70d4ca3a4fe70b06b16352a26ea0e0f84f678ca5570c7","license":"CAL","urls":["bzz-raw://9d6dc01d26cd90d457633b15703b06a6b408adbe8b47c8243763e0ebee6b2fa5","dweb:/ipfs/QmcTbdt7FSpB56sQXqM6Nr7rHNqJUDMX8KuDNfrBJhaC6f"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IParserV1.sol":{"keccak256":"0x7aa2e2071e1362e0d3e3f121340e967dc3e66fb4334559ee9a3d7a3577036d5a","license":"CAL","urls":["bzz-raw://cf25e938efa4930f1467b28f07fce27161d0022c42e8848feb2ac0664a5ef30e","dweb:/ipfs/QmYgwnZe7p6oyGRn1TAhEwLu9ihjksbuQcnqfix3otuQf7"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/bytecode/LibBytecode.sol":{"keccak256":"0x3b9911557b694389f7afbf29857971ca8ea11dcbbda701aa63a8669549c84f3c","license":"CAL","urls":["bzz-raw://43fd2c2c773800d717581ac57c0267a7492ffcdf9b8ed5fd93c590a27cd86538","dweb:/ipfs/QmT6vhXZXQtKoUmULUsGZ1fGTnvN8L9edzFXwh4azdpUNk"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/caller/LibContext.sol":{"keccak256":"0x87d556cd17c477fec548af7fb1cbad2d255442647a97c1c58a97a60ac62e97cc","license":"CAL","urls":["bzz-raw://dcbce583ad4909061b72f90624b1fe76ab74789cb81c62e8c6b3469e7ef7b991","dweb:/ipfs/QmR1r5jqevymGov1GssDdyGyacRF9Hx5ZWK6KQzpjebuhB"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/caller/LibEvaluable.sol":{"keccak256":"0x4e97f1b881ed91634456ba199d9e88894aa3f2f931eedeb0372a6b2607e69cef","license":"CAL","urls":["bzz-raw://b28f03e348bac3e0b802e04217ec990b7e88db2022503e670f970f107a67d2a8","dweb:/ipfs/QmUaEmvviNEH48ZNrhqqHGeQXAwrJSq9wyZRNoa9J5LJa6"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/deprecated/caller/LibEncodedDispatch.sol":{"keccak256":"0x6f9383a7a9adbcf0c187f8dc72fc40515b29051840f4546883e337b353553b09","license":"CAL","urls":["bzz-raw://4c2b9cfb84d183607f841ab55ac1561e5eb48e1bab81f4694ae81a5f7147b976","dweb:/ipfs/QmZzgCEwYX4f26Qi2MDP867nk3uHFzjxJexgmi4QC4VZgj"]},"lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/ns/LibNamespace.sol":{"keccak256":"0xfe8f67c423d7cfcb1ba4737de311e99d17b2ecba05331c55ef58a7694b769a7d","license":"CAL","urls":["bzz-raw://2ff26102b07577360c2f85955f5bd0e7660317b36c21b147a748861653b64a31","dweb:/ipfs/QmNSXHGSBVpJfdbdFtvAfc3H5SZB8Ro8mST7gmALRdDD9n"]},"lib/rain.orderbook.interface/src/interface/IOrderBookV4.sol":{"keccak256":"0x9d1c76afedc2dc040443e02ab0afbd2c94394e4c2125e218ae3643ed35cd0534","license":"CAL","urls":["bzz-raw://03f55f63adbde719d1a2038cbbbc3744bcba476def5cf5c986c4d7adc812351b","dweb:/ipfs/QmPNwrg7fV8m9mWSTbepJcd3dafRXkFByX8HwTakkyDMDw"]},"lib/rain.orderbook.interface/src/interface/IOrderBookV4OrderTaker.sol":{"keccak256":"0xdf258ac1a4ee852102ffc24fbc4991b2e6960b61ec17cbdae4f50aa993cb35e2","license":"CAL","urls":["bzz-raw://a8d12747949ef0d4bef2e433cea2277fe696ea2856c6750bc6b784179e433682","dweb:/ipfs/QmeEQqDjogCKXH7ef47fLdtfFdUobotjVybbZ1377Qj7ko"]},"lib/rain.orderbook.interface/src/interface/deprecated/v2/IOrderBookV2.sol":{"keccak256":"0xdb575c8c0935b3ae781ce85d35664a7917d3e543cc3a8310b265eea080862b83","license":"CAL","urls":["bzz-raw://4139f016ad21ff92c0f4106981e5a5f2cb5a99bd169b621b2c0705ccc6897e0d","dweb:/ipfs/QmQ7FY1W68VWsSvbzVJA5TjVBGk8hJzvRMkGGJ3xYrPqGs"]},"lib/rain.orderbook.interface/src/interface/deprecated/v3/IOrderBookV3.sol":{"keccak256":"0x758fe28e77f234f9e3d627de4fda4b380f9d4f62974bb305b65584f0b93d24a1","license":"CAL","urls":["bzz-raw://fec298a7b55a64c3c8ee88d11476d18773dbedc0ba8a8668930661b4d4d55c4f","dweb:/ipfs/QmXNZUuyK3mV6CGmLPRcv75xCmsfvPY6Har4SyKJpVpD7t"]},"lib/rain.orderbook.interface/src/interface/ierc3156/IERC3156FlashBorrower.sol":{"keccak256":"0x493227b1bc21c04ba2506d8d63f8fab8eb828683cf41336db1076edee2e010a7","license":"CC0","urls":["bzz-raw://99b27f1f11576c22462c93ab613835522dfc89a7e28e584df034b339187bc15c","dweb:/ipfs/QmQZ1H8PotScE5rSbruZn97MC6pgDNTuCQcjtg8ZWU4SPB"]},"lib/rain.orderbook.interface/src/interface/ierc3156/IERC3156FlashLender.sol":{"keccak256":"0x1c14bc32c7483a68f5cb3ff65f64a8a32b279472525340033ce8e0b462fd1e72","license":"CC0","urls":["bzz-raw://e25cbc0c4512d737fd9fb32f30af0f9bcccd10f28870c927057f6bcaac213dd4","dweb:/ipfs/Qmey7YDkCTMXgoRDVHUbHRH6f4MJz6mBdfucp7v7bVy1ie"]},"lib/rain.solmem/src/error/ErrUint256Array.sol":{"keccak256":"0x450fda2ab490459d3fe695c4ea15b7916a3dbeb02fc4c01348563629c0b95459","license":"CAL","urls":["bzz-raw://ddeb89925ce8164087ee3ad1493034191a27d57ce6317ed418d6cd26d1241f13","dweb:/ipfs/QmUMQYCuGBS57x1dM5TDZhjBxpG6Y8W1HW37RS9P5s7edh"]},"lib/rain.solmem/src/lib/LibBytes.sol":{"keccak256":"0xcdc485d90d6d8a89a842b64c83efd15266c5c80916535736aa8a05497bcf5625","license":"CAL","urls":["bzz-raw://a45d0edb1d404207ad328d7a4eb16ee52d68db8dbb44796caa521a4765dfe353","dweb:/ipfs/QmVT8vbFLMmD1sg1sEz21mTrDRE58yFNsmKDPnZ3LX8yYk"]},"lib/rain.solmem/src/lib/LibMemCpy.sol":{"keccak256":"0x6a2df10cc8f19bf99711c06ddf744080d922104b2f8aab4093ca1df8849a8406","license":"CAL","urls":["bzz-raw://58cdb4a850867b5ae325c28cd588a98e9c0b313fb7b70974fcb9ad357f552102","dweb:/ipfs/QmYvf96iHnS81aqt9sEcdvqpq6ghsk2fa8RVNBc6pttQJe"]},"lib/rain.solmem/src/lib/LibPointer.sol":{"keccak256":"0xcd833cbf588ec10836cdfbddd426fc14dfa145ed2e63054f6bbd06e296e698f7","license":"CAL","urls":["bzz-raw://9ce0af4045e276c5e4c352c1c435f4ecea7552192b1d99e33732c1067bea0ad7","dweb:/ipfs/Qmc5NCFTwgg2AemUz9K1fPei51ivge3eUrWP8k56kF8ADG"]},"lib/rain.solmem/src/lib/LibUint256Array.sol":{"keccak256":"0x2780114f75234ca2c416c5bb3d1650e06d7ed4314131b8398dec3fe78fe710ae","license":"CAL","urls":["bzz-raw://ff01409ff93b67f5c013f2cd752a40d2897665c2b4d192c9fef448af70a984e7","dweb:/ipfs/QmPb9SKLCkGUUPq5GjWCe3ziJ2SgwdGJk9q9tyh1eKF1Hn"]},"src/abstract/OrderBookV4FlashLender.sol":{"keccak256":"0x66caaf76be139878e8c81cac9108b7312d12b08e91c76ebb7927f6757de4468f","license":"CAL","urls":["bzz-raw://82d2a7d741430b59e21b930029b64459d368db04c9dab17044e0f979a1c2e6a9","dweb:/ipfs/QmT64t1reGrbpKhgwdCzR3TqU4qU2GhZqr19sWxKr2UYRx"]},"src/concrete/ob/OrderBook.sol":{"keccak256":"0x0d2a57fe621ebe203da977f8af45aec2e739d7095bed25878a2f3a561aa92f28","license":"CAL","urls":["bzz-raw://4943b0fc3f5f84c5976c18dc397c49b3e9c2545aa96cc1934129aa95dc43be41","dweb:/ipfs/QmWLmCwmV9ic8NJnhqpfJYqdE8zvX8BtaVWAy5ED6hZqwG"]},"src/lib/LibOrder.sol":{"keccak256":"0xa0ccb0d3bf616d6459cb0f96d5ace0f65e3670eb76326961e5d320b6907d2410","license":"CAL","urls":["bzz-raw://7b79bb23ecf3b2ea966744efd3aba5028f96f25ed9ac33ecce13ca027e4d9467","dweb:/ipfs/QmRdZuP2S7Ahu9dDhgXo4bHKPgUzNrLE9z4T3QvevvdtJs"]},"src/lib/LibOrderBook.sol":{"keccak256":"0x41af1d6ad695d32801498832bec69b3d810c3564bf685b8640aeb5da6d6fe828","license":"CAL","urls":["bzz-raw://f4cd315aa6dcd70fd4aaa62329b9f034c00ecf1813b2dc30c8b8411688a41823","dweb:/ipfs/QmPY8yHbDCVNvBmWbk9oGbVtFbFYr2xpZBirduJoYWs8KG"]}},"version":1}',
	metadata: {
		compiler: { version: '0.8.25+commit.b61c2a91' },
		language: 'Solidity',
		output: {
			abi: [
				{
					inputs: [{ internalType: 'bytes32', name: 'result', type: 'bytes32' }],
					type: 'error',
					name: 'FlashLenderCallbackFailed'
				},
				{
					inputs: [{ internalType: 'uint256', name: 'i', type: 'uint256' }],
					type: 'error',
					name: 'InvalidSignature'
				},
				{
					inputs: [
						{ internalType: 'uint256', name: 'minimumInput', type: 'uint256' },
						{ internalType: 'uint256', name: 'input', type: 'uint256' }
					],
					type: 'error',
					name: 'MinimumInput'
				},
				{ inputs: [], type: 'error', name: 'NoOrders' },
				{
					inputs: [
						{ internalType: 'address', name: 'sender', type: 'address' },
						{ internalType: 'address', name: 'owner', type: 'address' }
					],
					type: 'error',
					name: 'NotOrderOwner'
				},
				{
					inputs: [{ internalType: 'bytes', name: 'unmeta', type: 'bytes' }],
					type: 'error',
					name: 'NotRainMetaV1'
				},
				{ inputs: [], type: 'error', name: 'OrderNoHandleIO' },
				{ inputs: [], type: 'error', name: 'OrderNoInputs' },
				{ inputs: [], type: 'error', name: 'OrderNoOutputs' },
				{ inputs: [], type: 'error', name: 'OrderNoSources' },
				{
					inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
					type: 'error',
					name: 'SameOwner'
				},
				{
					inputs: [
						{
							internalType: 'uint8',
							name: 'aliceTokenDecimals',
							type: 'uint8'
						},
						{ internalType: 'uint8', name: 'bobTokenDecimals', type: 'uint8' }
					],
					type: 'error',
					name: 'TokenDecimalsMismatch'
				},
				{
					inputs: [
						{ internalType: 'address', name: 'aliceToken', type: 'address' },
						{ internalType: 'address', name: 'bobToken', type: 'address' }
					],
					type: 'error',
					name: 'TokenMismatch'
				},
				{
					inputs: [{ internalType: 'uint256', name: 'outputs', type: 'uint256' }],
					type: 'error',
					name: 'UnsupportedCalculateOutputs'
				},
				{
					inputs: [
						{ internalType: 'address', name: 'sender', type: 'address' },
						{ internalType: 'address', name: 'token', type: 'address' },
						{ internalType: 'uint256', name: 'vaultId', type: 'uint256' }
					],
					type: 'error',
					name: 'ZeroDepositAmount'
				},
				{ inputs: [], type: 'error', name: 'ZeroMaximumInput' },
				{
					inputs: [
						{ internalType: 'address', name: 'sender', type: 'address' },
						{ internalType: 'address', name: 'token', type: 'address' },
						{ internalType: 'uint256', name: 'vaultId', type: 'uint256' }
					],
					type: 'error',
					name: 'ZeroWithdrawTargetAmount'
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'bytes32',
							name: 'orderHash',
							type: 'bytes32',
							indexed: false
						},
						{
							internalType: 'struct OrderV3',
							name: 'order',
							type: 'tuple',
							components: [
								{ internalType: 'address', name: 'owner', type: 'address' },
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validInputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validOutputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
							],
							indexed: false
						}
					],
					type: 'event',
					name: 'AddOrderV2',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'struct ClearStateChange',
							name: 'clearStateChange',
							type: 'tuple',
							components: [
								{
									internalType: 'uint256',
									name: 'aliceOutput',
									type: 'uint256'
								},
								{ internalType: 'uint256', name: 'bobOutput', type: 'uint256' },
								{
									internalType: 'uint256',
									name: 'aliceInput',
									type: 'uint256'
								},
								{ internalType: 'uint256', name: 'bobInput', type: 'uint256' }
							],
							indexed: false
						}
					],
					type: 'event',
					name: 'AfterClear',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'struct OrderV3',
							name: 'alice',
							type: 'tuple',
							components: [
								{ internalType: 'address', name: 'owner', type: 'address' },
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validInputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validOutputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
							],
							indexed: false
						},
						{
							internalType: 'struct OrderV3',
							name: 'bob',
							type: 'tuple',
							components: [
								{ internalType: 'address', name: 'owner', type: 'address' },
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validInputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validOutputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
							],
							indexed: false
						},
						{
							internalType: 'struct ClearConfig',
							name: 'clearConfig',
							type: 'tuple',
							components: [
								{
									internalType: 'uint256',
									name: 'aliceInputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'aliceOutputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'bobInputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'bobOutputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'aliceBountyVaultId',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'bobBountyVaultId',
									type: 'uint256'
								}
							],
							indexed: false
						}
					],
					type: 'event',
					name: 'ClearV2',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'uint256[][]',
							name: 'context',
							type: 'uint256[][]',
							indexed: false
						}
					],
					type: 'event',
					name: 'Context',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'address',
							name: 'token',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'uint256',
							name: 'vaultId',
							type: 'uint256',
							indexed: false
						},
						{
							internalType: 'uint256',
							name: 'amount',
							type: 'uint256',
							indexed: false
						}
					],
					type: 'event',
					name: 'Deposit',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'bytes32',
							name: 'subject',
							type: 'bytes32',
							indexed: false
						},
						{
							internalType: 'bytes',
							name: 'meta',
							type: 'bytes',
							indexed: false
						}
					],
					type: 'event',
					name: 'MetaV1_2',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'address',
							name: 'owner',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'bytes32',
							name: 'orderHash',
							type: 'bytes32',
							indexed: false
						}
					],
					type: 'event',
					name: 'OrderExceedsMaxRatio',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'address',
							name: 'owner',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'bytes32',
							name: 'orderHash',
							type: 'bytes32',
							indexed: false
						}
					],
					type: 'event',
					name: 'OrderNotFound',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'address',
							name: 'owner',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'bytes32',
							name: 'orderHash',
							type: 'bytes32',
							indexed: false
						}
					],
					type: 'event',
					name: 'OrderZeroAmount',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'bytes32',
							name: 'orderHash',
							type: 'bytes32',
							indexed: false
						},
						{
							internalType: 'struct OrderV3',
							name: 'order',
							type: 'tuple',
							components: [
								{ internalType: 'address', name: 'owner', type: 'address' },
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validInputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validOutputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
							],
							indexed: false
						}
					],
					type: 'event',
					name: 'RemoveOrderV2',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'struct TakeOrderConfigV3',
							name: 'config',
							type: 'tuple',
							components: [
								{
									internalType: 'struct OrderV3',
									name: 'order',
									type: 'tuple',
									components: [
										{ internalType: 'address', name: 'owner', type: 'address' },
										{
											internalType: 'struct EvaluableV3',
											name: 'evaluable',
											type: 'tuple',
											components: [
												{
													internalType: 'contract IInterpreterV3',
													name: 'interpreter',
													type: 'address'
												},
												{
													internalType: 'contract IInterpreterStoreV2',
													name: 'store',
													type: 'address'
												},
												{
													internalType: 'bytes',
													name: 'bytecode',
													type: 'bytes'
												}
											]
										},
										{
											internalType: 'struct IO[]',
											name: 'validInputs',
											type: 'tuple[]',
											components: [
												{
													internalType: 'address',
													name: 'token',
													type: 'address'
												},
												{
													internalType: 'uint8',
													name: 'decimals',
													type: 'uint8'
												},
												{
													internalType: 'uint256',
													name: 'vaultId',
													type: 'uint256'
												}
											]
										},
										{
											internalType: 'struct IO[]',
											name: 'validOutputs',
											type: 'tuple[]',
											components: [
												{
													internalType: 'address',
													name: 'token',
													type: 'address'
												},
												{
													internalType: 'uint8',
													name: 'decimals',
													type: 'uint8'
												},
												{
													internalType: 'uint256',
													name: 'vaultId',
													type: 'uint256'
												}
											]
										},
										{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
									]
								},
								{
									internalType: 'uint256',
									name: 'inputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'outputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'struct SignedContextV1[]',
									name: 'signedContext',
									type: 'tuple[]',
									components: [
										{
											internalType: 'address',
											name: 'signer',
											type: 'address'
										},
										{
											internalType: 'uint256[]',
											name: 'context',
											type: 'uint256[]'
										},
										{ internalType: 'bytes', name: 'signature', type: 'bytes' }
									]
								}
							],
							indexed: false
						},
						{
							internalType: 'uint256',
							name: 'input',
							type: 'uint256',
							indexed: false
						},
						{
							internalType: 'uint256',
							name: 'output',
							type: 'uint256',
							indexed: false
						}
					],
					type: 'event',
					name: 'TakeOrderV2',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'sender',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'address',
							name: 'token',
							type: 'address',
							indexed: false
						},
						{
							internalType: 'uint256',
							name: 'vaultId',
							type: 'uint256',
							indexed: false
						},
						{
							internalType: 'uint256',
							name: 'targetAmount',
							type: 'uint256',
							indexed: false
						},
						{
							internalType: 'uint256',
							name: 'amount',
							type: 'uint256',
							indexed: false
						}
					],
					type: 'event',
					name: 'Withdraw',
					anonymous: false
				},
				{
					inputs: [
						{
							internalType: 'struct OrderConfigV3',
							name: 'orderConfig',
							type: 'tuple',
							components: [
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validInputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validOutputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' },
								{ internalType: 'bytes32', name: 'secret', type: 'bytes32' },
								{ internalType: 'bytes', name: 'meta', type: 'bytes' }
							]
						},
						{
							internalType: 'struct ActionV1[]',
							name: 'post',
							type: 'tuple[]',
							components: [
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct SignedContextV1[]',
									name: 'signedContext',
									type: 'tuple[]',
									components: [
										{
											internalType: 'address',
											name: 'signer',
											type: 'address'
										},
										{
											internalType: 'uint256[]',
											name: 'context',
											type: 'uint256[]'
										},
										{ internalType: 'bytes', name: 'signature', type: 'bytes' }
									]
								}
							]
						}
					],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'addOrder2',
					outputs: [{ internalType: 'bool', name: '', type: 'bool' }]
				},
				{
					inputs: [
						{
							internalType: 'struct OrderV3',
							name: 'aliceOrder',
							type: 'tuple',
							components: [
								{ internalType: 'address', name: 'owner', type: 'address' },
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validInputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validOutputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
							]
						},
						{
							internalType: 'struct OrderV3',
							name: 'bobOrder',
							type: 'tuple',
							components: [
								{ internalType: 'address', name: 'owner', type: 'address' },
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validInputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validOutputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
							]
						},
						{
							internalType: 'struct ClearConfig',
							name: 'clearConfig',
							type: 'tuple',
							components: [
								{
									internalType: 'uint256',
									name: 'aliceInputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'aliceOutputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'bobInputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'bobOutputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'aliceBountyVaultId',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'bobBountyVaultId',
									type: 'uint256'
								}
							]
						},
						{
							internalType: 'struct SignedContextV1[]',
							name: 'aliceSignedContext',
							type: 'tuple[]',
							components: [
								{ internalType: 'address', name: 'signer', type: 'address' },
								{
									internalType: 'uint256[]',
									name: 'context',
									type: 'uint256[]'
								},
								{ internalType: 'bytes', name: 'signature', type: 'bytes' }
							]
						},
						{
							internalType: 'struct SignedContextV1[]',
							name: 'bobSignedContext',
							type: 'tuple[]',
							components: [
								{ internalType: 'address', name: 'signer', type: 'address' },
								{
									internalType: 'uint256[]',
									name: 'context',
									type: 'uint256[]'
								},
								{ internalType: 'bytes', name: 'signature', type: 'bytes' }
							]
						}
					],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'clear2'
				},
				{
					inputs: [
						{ internalType: 'address', name: 'token', type: 'address' },
						{ internalType: 'uint256', name: 'vaultId', type: 'uint256' },
						{ internalType: 'uint256', name: 'amount', type: 'uint256' },
						{
							internalType: 'struct ActionV1[]',
							name: 'post',
							type: 'tuple[]',
							components: [
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct SignedContextV1[]',
									name: 'signedContext',
									type: 'tuple[]',
									components: [
										{
											internalType: 'address',
											name: 'signer',
											type: 'address'
										},
										{
											internalType: 'uint256[]',
											name: 'context',
											type: 'uint256[]'
										},
										{ internalType: 'bytes', name: 'signature', type: 'bytes' }
									]
								}
							]
						}
					],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'deposit2'
				},
				{
					inputs: [
						{
							internalType: 'struct ActionV1[]',
							name: 'post',
							type: 'tuple[]',
							components: [
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct SignedContextV1[]',
									name: 'signedContext',
									type: 'tuple[]',
									components: [
										{
											internalType: 'address',
											name: 'signer',
											type: 'address'
										},
										{
											internalType: 'uint256[]',
											name: 'context',
											type: 'uint256[]'
										},
										{ internalType: 'bytes', name: 'signature', type: 'bytes' }
									]
								}
							]
						}
					],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'enact'
				},
				{
					inputs: [
						{ internalType: 'address', name: '', type: 'address' },
						{ internalType: 'uint256', name: '', type: 'uint256' }
					],
					stateMutability: 'pure',
					type: 'function',
					name: 'flashFee',
					outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }]
				},
				{
					inputs: [
						{
							internalType: 'contract IERC3156FlashBorrower',
							name: 'receiver',
							type: 'address'
						},
						{ internalType: 'address', name: 'token', type: 'address' },
						{ internalType: 'uint256', name: 'amount', type: 'uint256' },
						{ internalType: 'bytes', name: 'data', type: 'bytes' }
					],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'flashLoan',
					outputs: [{ internalType: 'bool', name: '', type: 'bool' }]
				},
				{
					inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
					stateMutability: 'view',
					type: 'function',
					name: 'maxFlashLoan',
					outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }]
				},
				{
					inputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'multicall',
					outputs: [{ internalType: 'bytes[]', name: 'results', type: 'bytes[]' }]
				},
				{
					inputs: [{ internalType: 'bytes32', name: 'orderHash', type: 'bytes32' }],
					stateMutability: 'view',
					type: 'function',
					name: 'orderExists',
					outputs: [{ internalType: 'bool', name: '', type: 'bool' }]
				},
				{
					inputs: [
						{
							internalType: 'struct Quote',
							name: 'quoteConfig',
							type: 'tuple',
							components: [
								{
									internalType: 'struct OrderV3',
									name: 'order',
									type: 'tuple',
									components: [
										{ internalType: 'address', name: 'owner', type: 'address' },
										{
											internalType: 'struct EvaluableV3',
											name: 'evaluable',
											type: 'tuple',
											components: [
												{
													internalType: 'contract IInterpreterV3',
													name: 'interpreter',
													type: 'address'
												},
												{
													internalType: 'contract IInterpreterStoreV2',
													name: 'store',
													type: 'address'
												},
												{
													internalType: 'bytes',
													name: 'bytecode',
													type: 'bytes'
												}
											]
										},
										{
											internalType: 'struct IO[]',
											name: 'validInputs',
											type: 'tuple[]',
											components: [
												{
													internalType: 'address',
													name: 'token',
													type: 'address'
												},
												{
													internalType: 'uint8',
													name: 'decimals',
													type: 'uint8'
												},
												{
													internalType: 'uint256',
													name: 'vaultId',
													type: 'uint256'
												}
											]
										},
										{
											internalType: 'struct IO[]',
											name: 'validOutputs',
											type: 'tuple[]',
											components: [
												{
													internalType: 'address',
													name: 'token',
													type: 'address'
												},
												{
													internalType: 'uint8',
													name: 'decimals',
													type: 'uint8'
												},
												{
													internalType: 'uint256',
													name: 'vaultId',
													type: 'uint256'
												}
											]
										},
										{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
									]
								},
								{
									internalType: 'uint256',
									name: 'inputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'outputIOIndex',
									type: 'uint256'
								},
								{
									internalType: 'struct SignedContextV1[]',
									name: 'signedContext',
									type: 'tuple[]',
									components: [
										{
											internalType: 'address',
											name: 'signer',
											type: 'address'
										},
										{
											internalType: 'uint256[]',
											name: 'context',
											type: 'uint256[]'
										},
										{ internalType: 'bytes', name: 'signature', type: 'bytes' }
									]
								}
							]
						}
					],
					stateMutability: 'view',
					type: 'function',
					name: 'quote',
					outputs: [
						{ internalType: 'bool', name: '', type: 'bool' },
						{ internalType: 'uint256', name: '', type: 'uint256' },
						{ internalType: 'uint256', name: '', type: 'uint256' }
					]
				},
				{
					inputs: [
						{
							internalType: 'struct OrderV3',
							name: 'order',
							type: 'tuple',
							components: [
								{ internalType: 'address', name: 'owner', type: 'address' },
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validInputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{
									internalType: 'struct IO[]',
									name: 'validOutputs',
									type: 'tuple[]',
									components: [
										{ internalType: 'address', name: 'token', type: 'address' },
										{ internalType: 'uint8', name: 'decimals', type: 'uint8' },
										{
											internalType: 'uint256',
											name: 'vaultId',
											type: 'uint256'
										}
									]
								},
								{ internalType: 'bytes32', name: 'nonce', type: 'bytes32' }
							]
						},
						{
							internalType: 'struct ActionV1[]',
							name: 'post',
							type: 'tuple[]',
							components: [
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct SignedContextV1[]',
									name: 'signedContext',
									type: 'tuple[]',
									components: [
										{
											internalType: 'address',
											name: 'signer',
											type: 'address'
										},
										{
											internalType: 'uint256[]',
											name: 'context',
											type: 'uint256[]'
										},
										{ internalType: 'bytes', name: 'signature', type: 'bytes' }
									]
								}
							]
						}
					],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'removeOrder2',
					outputs: [{ internalType: 'bool', name: 'stateChanged', type: 'bool' }]
				},
				{
					inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
					stateMutability: 'view',
					type: 'function',
					name: 'supportsInterface',
					outputs: [{ internalType: 'bool', name: '', type: 'bool' }]
				},
				{
					inputs: [
						{
							internalType: 'struct TakeOrdersConfigV3',
							name: 'config',
							type: 'tuple',
							components: [
								{
									internalType: 'uint256',
									name: 'minimumInput',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'maximumInput',
									type: 'uint256'
								},
								{
									internalType: 'uint256',
									name: 'maximumIORatio',
									type: 'uint256'
								},
								{
									internalType: 'struct TakeOrderConfigV3[]',
									name: 'orders',
									type: 'tuple[]',
									components: [
										{
											internalType: 'struct OrderV3',
											name: 'order',
											type: 'tuple',
											components: [
												{
													internalType: 'address',
													name: 'owner',
													type: 'address'
												},
												{
													internalType: 'struct EvaluableV3',
													name: 'evaluable',
													type: 'tuple',
													components: [
														{
															internalType: 'contract IInterpreterV3',
															name: 'interpreter',
															type: 'address'
														},
														{
															internalType: 'contract IInterpreterStoreV2',
															name: 'store',
															type: 'address'
														},
														{
															internalType: 'bytes',
															name: 'bytecode',
															type: 'bytes'
														}
													]
												},
												{
													internalType: 'struct IO[]',
													name: 'validInputs',
													type: 'tuple[]',
													components: [
														{
															internalType: 'address',
															name: 'token',
															type: 'address'
														},
														{
															internalType: 'uint8',
															name: 'decimals',
															type: 'uint8'
														},
														{
															internalType: 'uint256',
															name: 'vaultId',
															type: 'uint256'
														}
													]
												},
												{
													internalType: 'struct IO[]',
													name: 'validOutputs',
													type: 'tuple[]',
													components: [
														{
															internalType: 'address',
															name: 'token',
															type: 'address'
														},
														{
															internalType: 'uint8',
															name: 'decimals',
															type: 'uint8'
														},
														{
															internalType: 'uint256',
															name: 'vaultId',
															type: 'uint256'
														}
													]
												},
												{
													internalType: 'bytes32',
													name: 'nonce',
													type: 'bytes32'
												}
											]
										},
										{
											internalType: 'uint256',
											name: 'inputIOIndex',
											type: 'uint256'
										},
										{
											internalType: 'uint256',
											name: 'outputIOIndex',
											type: 'uint256'
										},
										{
											internalType: 'struct SignedContextV1[]',
											name: 'signedContext',
											type: 'tuple[]',
											components: [
												{
													internalType: 'address',
													name: 'signer',
													type: 'address'
												},
												{
													internalType: 'uint256[]',
													name: 'context',
													type: 'uint256[]'
												},
												{
													internalType: 'bytes',
													name: 'signature',
													type: 'bytes'
												}
											]
										}
									]
								},
								{ internalType: 'bytes', name: 'data', type: 'bytes' }
							]
						}
					],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'takeOrders2',
					outputs: [
						{
							internalType: 'uint256',
							name: 'totalTakerInput',
							type: 'uint256'
						},
						{
							internalType: 'uint256',
							name: 'totalTakerOutput',
							type: 'uint256'
						}
					]
				},
				{
					inputs: [
						{ internalType: 'address', name: 'owner', type: 'address' },
						{ internalType: 'address', name: 'token', type: 'address' },
						{ internalType: 'uint256', name: 'vaultId', type: 'uint256' }
					],
					stateMutability: 'view',
					type: 'function',
					name: 'vaultBalance',
					outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }]
				},
				{
					inputs: [
						{ internalType: 'address', name: 'token', type: 'address' },
						{ internalType: 'uint256', name: 'vaultId', type: 'uint256' },
						{ internalType: 'uint256', name: 'targetAmount', type: 'uint256' },
						{
							internalType: 'struct ActionV1[]',
							name: 'post',
							type: 'tuple[]',
							components: [
								{
									internalType: 'struct EvaluableV3',
									name: 'evaluable',
									type: 'tuple',
									components: [
										{
											internalType: 'contract IInterpreterV3',
											name: 'interpreter',
											type: 'address'
										},
										{
											internalType: 'contract IInterpreterStoreV2',
											name: 'store',
											type: 'address'
										},
										{ internalType: 'bytes', name: 'bytecode', type: 'bytes' }
									]
								},
								{
									internalType: 'struct SignedContextV1[]',
									name: 'signedContext',
									type: 'tuple[]',
									components: [
										{
											internalType: 'address',
											name: 'signer',
											type: 'address'
										},
										{
											internalType: 'uint256[]',
											name: 'context',
											type: 'uint256[]'
										},
										{ internalType: 'bytes', name: 'signature', type: 'bytes' }
									]
								}
							]
						}
					],
					stateMutability: 'nonpayable',
					type: 'function',
					name: 'withdraw2'
				}
			],
			devdoc: {
				kind: 'dev',
				methods: {
					'addOrder2(((address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32,bytes32,bytes),((address,address,bytes),(address,uint256[],bytes)[])[])':
						{
							params: {
								config: 'All config required to build an `Order`.',
								post: 'Additional actions to run after the order is added. Order information SHOULD be made available during evaluation in context. If ANY of the post evaluables revert, the order MUST NOT be added.'
							},
							returns: {
								_0: 'True if the order was added, false if it already existed.'
							}
						},
					'clear2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(uint256,uint256,uint256,uint256,uint256,uint256),(address,uint256[],bytes)[],(address,uint256[],bytes)[])':
						{
							params: {
								alice: 'Some order to clear.',
								aliceSignedContext: 'Optional signed context that is relevant to A.',
								bob: 'Another order to clear.',
								bobSignedContext: 'Optional signed context that is relevant to B.',
								clearConfig:
									'Additional configuration for the clearance such as how to handle the bounty payment for the `msg.sender`.'
							}
						},
					'deposit2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])':
						{
							params: {
								amount: 'The amount of tokens to deposit.',
								post: 'Additional actions to run after the deposit. Deposit information SHOULD be made available during evaluation in context. If ANY of the post actions revert, the deposit MUST be reverted.',
								token: 'The token to deposit.',
								vaultId: 'The vault ID to deposit under.'
							}
						},
					'flashFee(address,uint256)': {
						details: 'The fee to be charged for a given loan.',
						params: {
							amount: 'The amount of tokens lent.',
							token: 'The loan currency.'
						},
						returns: {
							_0: 'The amount of `token` to be charged for the loan, on top of the returned principal.'
						}
					},
					'flashLoan(address,address,uint256,bytes)': {
						details: 'Initiate a flash loan.',
						params: {
							amount: 'The amount of tokens lent.',
							data: 'Arbitrary data structure, intended to contain user-defined parameters.',
							receiver: 'The receiver of the tokens in the loan, and the receiver of the callback.',
							token: 'The loan currency.'
						}
					},
					'maxFlashLoan(address)': {
						details: 'The amount of currency available to be lent.',
						params: { token: 'The loan currency.' },
						returns: { _0: 'The amount of `token` that can be borrowed.' }
					},
					'multicall(bytes[])': {
						'custom:oz-upgrades-unsafe-allow-reachable': 'delegatecall',
						details: 'Receives and executes a batch of function calls on this contract.'
					},
					'orderExists(bytes32)': {
						params: { orderHash: 'The hash of the order to check.' },
						returns: { _0: 'True if the order exists, false otherwise.' }
					},
					'quote(((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[]))':
						{
							params: { quoteConfig: 'The configuration for the quote.' },
							returns: {
								_0: 'True if the order exists, false otherwise.',
								_1: 'The maximum output amount that the order could send. Is `0` if the order does not exist.',
								_2: 'The input:output ratio of the order. Is `0` if the order does not exist.'
							}
						},
					'removeOrder2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),((address,address,bytes),(address,uint256[],bytes)[])[])':
						{
							params: {
								order: 'The `Order` data exactly as it was added.',
								post: 'Additional actions to run after the order is removed. Order information SHOULD be made available during evaluation in context. If ANY of the post evaluables revert, the order MUST NOT be removed.'
							},
							returns: {
								stateChanged: 'True if the order was removed, false if it did not exist.'
							}
						},
					'supportsInterface(bytes4)': {
						details:
							'Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created. This function call must use less than 30 000 gas.'
					},
					'takeOrders2((uint256,uint256,uint256,((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[])[],bytes))':
						{
							params: {
								config:
									'The constraints and list of orders to take, orders are processed sequentially in order as provided, there is NO ATTEMPT onchain to predict/filter/sort these orders other than evaluating them as provided. Inputs and outputs are from the perspective of `msg.sender` except for values specified by the orders themselves which are the from the perspective of that order.'
							},
							returns: {
								totalTakerInput:
									'Total tokens sent to `msg.sender`, taken from order vaults processed.',
								totalTakerOutput:
									'Total tokens taken from `msg.sender` and distributed between vaults.'
							}
						},
					'vaultBalance(address,address,uint256)': {
						params: {
							owner: 'The owner of the vault.',
							token: 'The token the vault is for.',
							vaultId: 'The vault ID to read.'
						},
						returns: { _0: 'The current balance of the vault.' }
					},
					'withdraw2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])':
						{
							params: {
								post: 'Additional actions to run after the withdraw. Withdraw information SHOULD be made available during evaluation in context. If ANY of the post evaluables revert, the withdraw MUST be reverted.',
								targetAmount:
									'The amount of tokens to attempt to withdraw. MAY result in fewer tokens withdrawn if the vault balance is lower than the target amount. MAY NOT be zero, the order book MUST revert with `ZeroWithdrawTargetAmount` if the amount is zero.',
								token: 'The token to withdraw.',
								vaultId: 'The vault ID to withdraw from.'
							}
						}
				},
				version: 1
			},
			userdoc: {
				kind: 'user',
				methods: {
					'addOrder2(((address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32,bytes32,bytes),((address,address,bytes),(address,uint256[],bytes)[])[])':
						{
							notice:
								'Given an order config, deploys the expression and builds the full `Order` for the config, then records it as an active order. Delegated adding an order is NOT supported. The `msg.sender` that adds an order is ALWAYS the owner and all resulting vault movements are their own. MUST revert with `OrderNoSources` if the order has no associated calculation and `OrderNoHandleIO` if the order has no handle IO entrypoint. The calculation MUST return at least two values from evaluation, the maximum amount and the IO ratio. The handle IO entrypoint SHOULD return zero values from evaluation. Either MAY revert during evaluation on the interpreter, which MUST prevent the order from clearing. MUST revert with `OrderNoInputs` if the order has no inputs. MUST revert with `OrderNoOutputs` if the order has no outputs. If the order already exists, the order book MUST NOT change state, which includes not emitting an event. Instead it MUST return false. If the order book modifies state it MUST emit an `AddOrder` event and return true.'
						},
					'clear2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),(uint256,uint256,uint256,uint256,uint256,uint256),(address,uint256[],bytes)[],(address,uint256[],bytes)[])':
						{
							notice:
								'Allows `msg.sender` to match two live orders placed earlier by non-interactive parties and claim a bounty in the process. The clearer is free to select any two live orders on the order book for matching and as long as they have compatible tokens, ratios and amounts, the orders will clear. Clearing the orders DOES NOT remove them from the orderbook, they remain live until explicitly removed by their owner. Even if the input vault balances are completely emptied, the orders remain live until removed. This allows order owners to deploy a strategy over a long period of time and periodically top up the input vaults. Clearing two orders from the same owner is disallowed. Any mismatch in the ratios between the two orders will cause either more inputs than there are available outputs (transaction will revert) or less inputs than there are available outputs. In the latter case the excess outputs are given to the `msg.sender` of clear, to the vaults they specify in the clear config. This not only incentivises "automatic" clear calls for both alice and bob, but incentivises _prioritising greater ratio differences_ with a larger bounty. The second point is important because it implicitly prioritises orders that are further from the current market price, thus putting constant increasing pressure on the entire system the further it drifts from the norm, no matter how esoteric the individual order expressions and sizings might be. All else equal there are several factors that would impact how reliably some order clears relative to the wider market, such as: - Bounties are effectively percentages of cleared amounts so larger   orders have larger bounties and cover gas costs more easily - High gas on the network means that orders are harder to clear   profitably so the negative spread of the ratios will need to be larger - Complex and stateful expressions cost more gas to evalulate so the   negative spread will need to be larger - Erratic behavior of the order owner could reduce the willingness of   third parties to interact if it could result in wasted gas due to   orders suddently being removed before clearance etc. - Dynamic and highly volatile words used in the expression could be   ignored or low priority by clearers who want to be sure that they can   accurately predict the ratios that they include in their clearance - Geopolitical issues such as sanctions and regulatory restrictions could   cause issues for certain owners and clearers'
						},
					'deposit2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])':
						{
							notice:
								'Vault IDs are namespaced by the token address so there is no risk of collision between tokens. For example, vault ID 0 for token A is completely different to vault ID 0 for token B. `0` amount deposits are unsupported as underlying token contracts handle `0` value transfers differently and this would be a source of confusion. The order book MUST revert with `ZeroDepositAmount` if the amount is zero.'
						},
					'enact(((address,address,bytes),(address,uint256[],bytes)[])[])': {
						notice:
							'`msg.sender` enacts the provided actions. This DOES NOT return any values, and MUST NOT modify any vault balances. Presumably the expressions will modify some internal state associated with active orders. If ANY of the expressions revert, the entire transaction MUST revert.'
					},
					'maxFlashLoan(address)': {
						notice:
							"There's no limit to the size of a flash loan from `Orderbook` other than the current tokens deposited in `Orderbook`. If there is an active debt then loans are disabled so the max becomes `0` until after repayment."
					},
					'orderExists(bytes32)': {
						notice: 'Returns true if the order exists, false otherwise.'
					},
					'quote(((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[]))':
						{
							notice:
								"Quotes the provided order for the caller. The caller is considered to be the counterparty to the order, for the purposes of evaluating the quote. However, the caller's vault balances and/or tokens in wallet are not considered in the quote. This means the output max can exceed what the caller could actually pay for. Both the output max and io ratio are returned as 18 decimal fixed point values, ignoring any token decimals, so are not the literal amounts that would be moved in the order were it to clear."
						},
					'removeOrder2((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),((address,address,bytes),(address,uint256[],bytes)[])[])':
						{
							notice:
								'Order owner can remove their own orders. Delegated order removal is NOT supported and will revert. Removing an order multiple times or removing an order that never existed are valid, the event will be emitted and the transaction will complete with that order hash definitely, redundantly not live.'
						},
					'takeOrders2((uint256,uint256,uint256,((address,(address,address,bytes),(address,uint8,uint256)[],(address,uint8,uint256)[],bytes32),uint256,uint256,(address,uint256[],bytes)[])[],bytes))':
						{
							notice:
								"Allows `msg.sender` to attempt to fill a list of orders in sequence without needing to place their own order and clear them. This works like a market buy but against a specific set of orders. Every order will looped over and calculated individually then filled maximally until the request input is reached for the `msg.sender`. The `msg.sender` is responsible for selecting the best orders at the time according to their criteria and MAY specify a maximum IO ratio to guard against an order spiking the ratio beyond what the `msg.sender` expected and is comfortable with. As orders may be removed and calculate their ratios dynamically, all issues fulfilling an order other than misconfiguration by the `msg.sender` are no-ops and DO NOT revert the transaction. This allows the `msg.sender` to optimistically provide a list of orders that they aren't sure will completely fill at a good price, and fallback to more reliable orders further down their list. Misconfiguration such as token mismatches are errors that revert as this is known and static at all times to the `msg.sender` so MUST be provided correctly. `msg.sender` MAY specify a minimum input that MUST be reached across all orders in the list, otherwise the transaction will revert, this MAY be set to zero. Exactly like withdraw, if there is an active flash loan for `msg.sender` they will have their outstanding loan reduced by the final input amount preferentially before sending any tokens. Notably this allows arb bots implemented as flash loan borrowers to connect orders against external liquidity directly by paying back the loan with a `takeOrders` call and outputting the result of the external trade. Rounding errors always favour the order never the `msg.sender`."
						},
					'vaultBalance(address,address,uint256)': {
						notice: 'Get the current balance of a vault for a given owner, token and vault ID.'
					},
					'withdraw2(address,uint256,uint256,((address,address,bytes),(address,uint256[],bytes)[])[])':
						{
							notice:
								'Allows the sender to withdraw any tokens from their own vaults. If the withrawer has an active flash loan debt denominated in the same token being withdrawn then Orderbook will merely reduce the debt and NOT send the amount of tokens repaid to the flashloan debt. MUST revert if the amount _requested_ to withdraw is zero. The withdrawal MAY still not move any tokens (without revert) if the vault balance is zero, or the withdrawal is used to repay a flash loan, or due to any other internal accounting.'
						}
				},
				version: 1
			}
		},
		settings: {
			remappings: [
				'@prb/test/=lib/rain.interpreter/lib/prb-math/lib/prb-test/src/',
				'axelar-gmp-sdk-solidity/=lib/sushixswap-v2/lib/axelar-gmp-sdk-solidity/',
				'bytecode/=lib/rain.interpreter/lib/rain.interpreter.interface/src/lib/bytecode/',
				'caller/=lib/rain.interpreter/lib/rain.interpreter.interface/src/lib/caller/',
				'constants/=lib/rain.interpreter/src/lib/constants/',
				'deprecated/=lib/rain.interpreter/lib/rain.interpreter.interface/src/lib/',
				'ds-test/=lib/rain.solmem/lib/forge-std/lib/ds-test/src/',
				'erc4626-tests/=lib/rain.interpreter/lib/openzeppelin-contracts/lib/erc4626-tests/',
				'eval/=lib/rain.interpreter/src/lib/eval/',
				'extern/=lib/rain.interpreter/src/lib/extern/',
				'forge-gas-snapshot/=lib/sushixswap-v2/lib/forge-gas-snapshot/src/',
				'forge-std/=lib/rain.interpreter/lib/rain.interpreter.interface/lib/forge-std/src/',
				'integrity/=lib/rain.interpreter/src/lib/integrity/',
				'ns/=lib/rain.interpreter/lib/rain.interpreter.interface/src/lib/ns/',
				'op/=lib/rain.interpreter/src/lib/op/',
				'openzeppelin-contracts/=lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/',
				'openzeppelin/=lib/rain.interpreter/lib/openzeppelin-contracts/contracts/',
				'parse/=lib/rain.interpreter/src/lib/parse/',
				'prb-math/=lib/rain.interpreter/lib/prb-math/src/',
				'prb-test/=lib/rain.interpreter/lib/prb-math/lib/prb-test/src/',
				'rain.chainlink/=lib/rain.interpreter/lib/rain.chainlink/src/',
				'rain.datacontract/=lib/rain.interpreter/lib/rain.datacontract/src/',
				'rain.erc1820/=lib/rain.erc1820/src/',
				'rain.interpreter.interface/=lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/',
				'rain.interpreter/=lib/rain.interpreter/src/',
				'rain.intorastring/=lib/rain.interpreter/lib/rain.intorastring/',
				'rain.lib.hash/=lib/rain.lib.memkv/lib/rain.lib.hash/src/',
				'rain.lib.memkv/=lib/rain.lib.memkv/src/',
				'rain.lib.typecast/=lib/rain.interpreter/lib/rain.lib.typecast/src/',
				'rain.math.binary/=lib/rain.interpreter/lib/rain.math.binary/src/',
				'rain.math.fixedpoint/=lib/rain.interpreter/lib/rain.math.fixedpoint/src/',
				'rain.math.float/=lib/rain.interpreter/lib/rain.math.float/',
				'rain.math.saturating/=lib/rain.interpreter/lib/rain.math.fixedpoint/lib/rain.math.saturating/src/',
				'rain.metadata/=lib/rain.interpreter/lib/rain.metadata/src/',
				'rain.orderbook.interface/=lib/rain.orderbook.interface/src/',
				'rain.sol.codegen/=lib/rain.interpreter/lib/rain.sol.codegen/src/',
				'rain.solmem/=lib/rain.solmem/src/',
				'sol.lib.binmaskflag/=lib/rain.interpreter/lib/sol.lib.binmaskflag/src/',
				'state/=lib/rain.interpreter/src/lib/state/',
				'sushixswap-v2/=lib/sushixswap-v2/'
			],
			optimizer: { enabled: true, runs: 1000000 },
			metadata: { bytecodeHash: 'none', appendCBOR: false },
			compilationTarget: { 'src/concrete/ob/OrderBook.sol': 'OrderBook' },
			evmVersion: 'cancun',
			libraries: {}
		},
		sources: {
			'lib/rain.interpreter/lib/rain.math.fixedpoint/src/error/ErrScale.sol': {
				keccak256: '0x5ece50469527887cae518ba34668bfc4130fa5bc37af1fd5f410b0c17d5eb17d',
				urls: [
					'bzz-raw://a00a185f18618c47658ab0c340afe73cc7fabca41b133f1ad24bc5f2ca58be2f',
					'dweb:/ipfs/QmZhJAghxAYuvpCiMLR1vqyNhbZWycT2eP24NCAH4esu98'
				],
				license: 'CAL'
			},
			'lib/rain.interpreter/lib/rain.math.fixedpoint/src/lib/FixedPointDecimalConstants.sol': {
				keccak256: '0x65be2b379168a3efb169e05a31c4e9e60d6f1ff15352366224c98dadced64785',
				urls: [
					'bzz-raw://3c559b2dc57ff47bbe0c7adfb016a1db4291540bc270d5e0dbaa9004d2f2c33b',
					'dweb:/ipfs/QmaXXEnHnrbCXWogGw3mM1vQJytzeZG9sMccq4dCdiG1hK'
				],
				license: 'CAL'
			},
			'lib/rain.interpreter/lib/rain.math.fixedpoint/src/lib/LibFixedPointDecimalArithmeticOpenZeppelin.sol':
				{
					keccak256: '0x86c67ba3f7c2131b662bec27aa20487249e97a7f2f6b62a594d4137f81eefec8',
					urls: [
						'bzz-raw://1450bedea26b064197713bbdfa6e07acb3f6e5d6bc66faa50511ec99163722a5',
						'dweb:/ipfs/QmbWGmzaLar3iWCzfy2TjYcrVSowBPj84qNrpFyS4D1FDE'
					],
					license: 'CAL'
				},
			'lib/rain.interpreter/lib/rain.math.fixedpoint/src/lib/LibFixedPointDecimalScale.sol': {
				keccak256: '0xf66ad9cd424e1d93e87d8701c7382f7185bb986f3579e09e458aeda4d53415c7',
				urls: [
					'bzz-raw://411bcbcd63860e2f72f2f2c6b76ab27439f6d3013dff410549d2b3458f59a4de',
					'dweb:/ipfs/QmcEvxmPDZCr39b5gcs8S2h2VWYkQgeGWBTo6mPDUuLvLJ'
				],
				license: 'CAL'
			},
			'lib/rain.interpreter/lib/rain.metadata/src/interface/deprecated/IMetaV1.sol': {
				keccak256: '0x7c13c3885716aaa55baa3af8f1eb62548613cf16a73839380f420980491b9b6a',
				urls: [
					'bzz-raw://633e3365a59c38cb17fdfe79866f6645b578666cab3f13f1bc737ac48440786f',
					'dweb:/ipfs/QmPprM1VpJg5y9BjxY1VysL4WeipbGVLJ9AneG9z1RzXp5'
				],
				license: 'CAL'
			},
			'lib/rain.interpreter/lib/rain.metadata/src/interface/unstable/IMetaV1_2.sol': {
				keccak256: '0x7ecb17679434cc8e75190d175ef58aff4fdfe612620df0a70ed2e9bafe19a771',
				urls: [
					'bzz-raw://9071b0211ba736c95de63aa7b0df56f60d89d26b56f9a7a27a34593e07fe5040',
					'dweb:/ipfs/QmYCh49wVL6kp3AQ99HxiLhbiHEB3JLtEc6tEqJnQtyEZL'
				],
				license: 'CAL'
			},
			'lib/rain.interpreter/lib/rain.metadata/src/lib/LibMeta.sol': {
				keccak256: '0x5d339ca4b4d1326108c3b0aaae04294cb86645239629a947fe5cb08ffb95b78f',
				urls: [
					'bzz-raw://14d198a3ca2bcdc0cf45729f6e85f4dd0eb7ef94c378a653da24c55c08f0301d',
					'dweb:/ipfs/QmddA19AaGT38oRkQDyrRQEGe8XffZCTML36m4FxUGx2B3'
				],
				license: 'CAL'
			},
			'lib/rain.lib.memkv/lib/rain.lib.hash/src/LibHashNoAlloc.sol': {
				keccak256: '0x52c8b6906d61bcc7e70d594cb097f53e361569904e27019ebeed0b4c94d2aed8',
				urls: [
					'bzz-raw://62999b0afefbe97e1d41c2c57b67a186e5a1618758f8f9cf17776c1d67f27d24',
					'dweb:/ipfs/QmfVsV2CVp91F9dHNWziKvSo54Wgb84k5Ct7Rtxxyptw35'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/interfaces/IERC1271.sol':
				{
					keccak256: '0x0705a4b1b86d7b0bd8432118f226ba139c44b9dcaba0a6eafba2dd7d0639c544',
					urls: [
						'bzz-raw://c45b821ef9e882e57c256697a152e108f0f2ad6997609af8904cae99c9bd422e',
						'dweb:/ipfs/QmRKCJW6jjzR5UYZcLpGnhEJ75UVbH6EHkEa49sWx2SKng'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol':
				{
					keccak256: '0xa535a5df777d44e945dd24aa43a11e44b024140fc340ad0dfe42acf4002aade1',
					urls: [
						'bzz-raw://41319e7f621f2dc3733511332c4fd032f8e32ad2aa7fd6f665c19741d9941a34',
						'dweb:/ipfs/QmcYR3bd862GD1Bc7jwrU9bGxrhUu5na1oP964bDCu2id1'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol':
				{
					keccak256: '0x287b55befed2961a7eabd7d7b1b2839cbca8a5b80ef8dcbb25ed3d4c2002c305',
					urls: [
						'bzz-raw://bd39944e8fc06be6dbe2dd1d8449b5336e23c6a7ba3e8e9ae5ae0f37f35283f5',
						'dweb:/ipfs/QmPV3FGYjVwvKSgAXKUN3r9T9GwniZz83CxBpM7vyj2G53'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol':
				{
					keccak256: '0xb264c03a3442eb37a68ad620cefd1182766b58bee6cec40343480392d6b14d69',
					urls: [
						'bzz-raw://28879d01fd22c07b44f006612775f8577defbe459cb01685c5e25cd518c91a71',
						'dweb:/ipfs/QmVgfkwv2Fxw6hhTcDUZhE7NkoSKjab3ipM7UaRbt6uXb5'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol':
				{
					keccak256: '0xabefac93435967b4d36a4fabcbdbb918d1f0b7ae3c3d85bc30923b326c927ed1',
					urls: [
						'bzz-raw://9d213d3befca47da33f6db0310826bcdb148299805c10d77175ecfe1d06a9a68',
						'dweb:/ipfs/QmRgCn6SP1hbBkExUADFuDo8xkT4UU47yjNF5FhCeRbQmS'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/Address.sol':
				{
					keccak256: '0x006dd67219697fe68d7fbfdea512e7c4cb64a43565ed86171d67e844982da6fa',
					urls: [
						'bzz-raw://2455248c8ddd9cc6a7af76a13973cddf222072427e7b0e2a7d1aff345145e931',
						'dweb:/ipfs/QmfYjnjRbWqYpuxurqveE6HtzsY1Xx323J428AKQgtBJZm'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/Context.sol':
				{
					keccak256: '0xa92e4fa126feb6907daa0513ddd816b2eb91f30a808de54f63c17d0e162c3439',
					urls: [
						'bzz-raw://a367861093b74443b137564d3f3c472f70bcf114739e62059c939f25e315706c',
						'dweb:/ipfs/Qmd7JMpcxD9RuQjK3uM3EzJUgSqdN8vzp8eytEiuwxQJ6h'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/Multicall.sol':
				{
					keccak256: '0xebb546d772e9adda99ec85b6224bcbfb2a1238f26bd2e0f9610e7eff580e4aa0',
					urls: [
						'bzz-raw://acbb946122013b140ec5157ac80346956d74774c7ea721e0058f305de03a7151',
						'dweb:/ipfs/QmaYmWD5pGLhD4SbL4we44rLCGym2tLgdUf3E9vjgZHg9b'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/Strings.sol':
				{
					keccak256: '0x3088eb2868e8d13d89d16670b5f8612c4ab9ff8956272837d8e90106c59c14a0',
					urls: [
						'bzz-raw://b81d9ff6559ea5c47fc573e17ece6d9ba5d6839e213e6ebc3b4c5c8fe4199d7f',
						'dweb:/ipfs/QmPCW1bFisUzJkyjroY3yipwfism9RRCigCcK1hbXtVM8n'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol':
				{
					keccak256: '0x809bc3edb4bcbef8263fa616c1b60ee0004b50a8a1bfa164d8f57fd31f520c58',
					urls: [
						'bzz-raw://8b93a1e39a4a19eba1600b92c96f435442db88cac91e315c8291547a2a7bcfe2',
						'dweb:/ipfs/QmTm34KVe6uZBZwq8dZDNWwPcm24qBJdxqL3rPxBJ4LrMv'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/cryptography/SignatureChecker.sol':
				{
					keccak256: '0x3af3ca86df39aac39a0514c84459d691434a108d2151c8ce9d69f32e315cab80',
					urls: [
						'bzz-raw://77d1f1cf302cd5e1dfbbb4ce3b281b28e8c52942d4319fce43df2e1b6f02a52d',
						'dweb:/ipfs/QmT6ZXStmK3Knhh9BokeVHQ9HXTBZNgL3Eb1ar1cYg1hWy'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol':
				{
					keccak256: '0xd10975de010d89fd1c78dc5e8a9a7e7f496198085c151648f20cba166b32582b',
					urls: [
						'bzz-raw://fb0048dee081f6fffa5f74afc3fb328483c2a30504e94a0ddd2a5114d731ec4d',
						'dweb:/ipfs/QmZptt1nmYoA5SgjwnSgWqgUSDgm4q52Yos3xhnMv3MV43'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol':
				{
					keccak256: '0x447a5f3ddc18419d41ff92b3773fb86471b1db25773e07f877f548918a185bf1',
					urls: [
						'bzz-raw://be161e54f24e5c6fae81a12db1a8ae87bc5ae1b0ddc805d82a1440a68455088f',
						'dweb:/ipfs/QmP7C3CHdY9urF4dEMb9wmsp1wMxHF6nhA2yQE5SKiPAdy'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/math/Math.sol':
				{
					keccak256: '0xe4455ac1eb7fc497bb7402579e7b4d64d928b846fce7d2b6fde06d366f21c2b3',
					urls: [
						'bzz-raw://cc8841b3cd48ad125e2f46323c8bad3aa0e88e399ec62acb9e57efa7e7c8058c',
						'dweb:/ipfs/QmSqE4mXHA2BXW58deDbXE8MTcsL5JSKNDbm23sVQxRLPS'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol':
				{
					keccak256: '0xf92515413956f529d95977adc9b0567d583c6203fc31ab1c23824c35187e3ddc',
					urls: [
						'bzz-raw://c50fcc459e49a9858b6d8ad5f911295cb7c9ab57567845a250bf0153f84a95c7',
						'dweb:/ipfs/QmcEW85JRzvDkQggxiBBLVAasXWdkhEysqypj9EaB6H2g6'
					],
					license: 'MIT'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/error/ErrBytecode.sol': {
				keccak256: '0x9ae3ff0ab3c2982996fde4405282b3c417133b8294afc75d0680b6e40185e326',
				urls: [
					'bzz-raw://00baa931a3f9f40ac362114908f3ef5e0dd790db14d198c9eea1340905cdbefc',
					'dweb:/ipfs/QmPYF6ENnnGxpvMJXKHrbmvVdXkpvkkT4FoCBCDU1HajST'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/IInterpreterCallerV3.sol':
				{
					keccak256: '0xd818d3b51e603656679d845d486d94ab9784a209efd198dd0547816a642afa24',
					urls: [
						'bzz-raw://7a03211d646bbdc28eb3b8fcbf22a183c315fbded26c4dfc4f5e95a8380f85be',
						'dweb:/ipfs/QmbtHUoAtrqbcCYPmPVoxwawiYJcqpmjfA4y5BqxfBCHkN'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/IInterpreterStoreV2.sol':
				{
					keccak256: '0xfd1df694f4dcf8b21df8d67716c84bad592fabef2a5e24728264d95b5ecc23bc',
					urls: [
						'bzz-raw://ddf4359ede27b9ed71d6440ea947bd69e98e1e0498de4552738a8acafbf83165',
						'dweb:/ipfs/QmPVdhTyPgUP6b1GrDVhiCZ2459nhzA4H9FNdJ5LjJ53ik'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/IInterpreterV3.sol':
				{
					keccak256: '0xa4af4c32d8f6dc7e52c8ebf812b67a1909f2920df6e6e9795af041d2be991cbf',
					urls: [
						'bzz-raw://a567ff304ecdbb9356147136c4a2a776cda345deeecce5f9d41e2beed202943a',
						'dweb:/ipfs/QmVN8SHkgqemVgRJiEMPGB6sXPTDWWGk1SfKjcXNPj4QBE'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/IParserV2.sol': {
				keccak256: '0xef68ad9d16ae38ece9d4effb6682b2e6ba56167a3ef36f2c71c0a86f4e7d60a6',
				urls: [
					'bzz-raw://8162ce3646b52d8f271eca1c122351bb23989032f2734675822f84d5b6a31b69',
					'dweb:/ipfs/QmZPxxmKdLeNuJNiHcbzGs4BDYiDjabYjRj5PfRr2YTYsp'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IExpressionDeployerV1.sol':
				{
					keccak256: '0x2a001152546ab44208a126f1f518da086d6d6e2310db6b987d58cf8731c5eab0',
					urls: [
						'bzz-raw://aa1bd59abdb21d8c16945b057e73a0d19e5d7ab910630dd91cadc195c9c705e3',
						'dweb:/ipfs/QmPHbu9bpS7L8MoUSRH7PWpvcVe4zinxTn8LCkGroiXasc'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IExpressionDeployerV2.sol':
				{
					keccak256: '0x2b8e9d48c92c2c0e874fb4d073b0cb013fb36a830e16c68657bcf65ede7d8b16',
					urls: [
						'bzz-raw://8de383c71dcaabb32fd9b91912bc7cba001a5a89c6f5de08b1a92447d0bebd12',
						'dweb:/ipfs/QmV1JV5ctH9cktJbYJxXvBNBePshfVB58voEUMCbgCtkhj'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IExpressionDeployerV3.sol':
				{
					keccak256: '0x4e7b54e9345625d091c0c80a5cd7e1cd5e56d4a8cd3c5ec3420c638ebb5797fb',
					urls: [
						'bzz-raw://9e99b981214398be41e07a2e1ed403c394ea4916c6cfd3e614be1c1e9257fa11',
						'dweb:/ipfs/QmfXP4KxyzQgfcBeL6N2uLRRDnWoZDtU28DMQ7VFgxBhWk'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterCallerV1.sol':
				{
					keccak256: '0xb6be0766bb6f4021809b81a4f35cc43bfbceaa5e1bef6484c000d059e24e33a8',
					urls: [
						'bzz-raw://a9458880e68a3c6348ef10ba9de1b8942316828b8b5012bd7d20a473b69115a8',
						'dweb:/ipfs/QmbmsXPGYmPmdVTyZGWWWypvc3e1Qqw2gyTnwajBzjFsfu'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterCallerV2.sol':
				{
					keccak256: '0x65b2d484f373225f539e694a8706b45fa4da96d3aa7ae24d48cecc03e9a62895',
					urls: [
						'bzz-raw://bee43df581fc023bcba28a05602781d6ae3a752c10fc959bf821b2ba5425b2f3',
						'dweb:/ipfs/QmbyiLfjw3khhuRojPU9UFM5CPud5gp4YCdeump7BpptVm'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterStoreV1.sol':
				{
					keccak256: '0x4e03ec42747b2ce6bed9f522ab11bd555f9831e39b45cb9dcbf601554ce50fb9',
					urls: [
						'bzz-raw://ff1978aac681dafee36aa7bc4b2470e2da5c9bc205f50f1e0fbfef9bcc75e0e9',
						'dweb:/ipfs/QmeK9q4soBCywAvtMMiw1AfJP9BYarVGNzmBaSQcQ33wMd'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterV1.sol':
				{
					keccak256: '0xcb53d0989403dbde29b4a7791ae42579f6ece55d76c5b8a18025ff1308175957',
					urls: [
						'bzz-raw://af4421c4406774b7a43c2cccae974d98c84c427a108cd1af0e364b39f32c604a',
						'dweb:/ipfs/Qma7HTFnZ3PNZQNk3Mz2pvG2U6EWwXDfSBx5yVv1HUUUZy'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IInterpreterV2.sol':
				{
					keccak256: '0xf61949cde075def994d70d4ca3a4fe70b06b16352a26ea0e0f84f678ca5570c7',
					urls: [
						'bzz-raw://9d6dc01d26cd90d457633b15703b06a6b408adbe8b47c8243763e0ebee6b2fa5',
						'dweb:/ipfs/QmcTbdt7FSpB56sQXqM6Nr7rHNqJUDMX8KuDNfrBJhaC6f'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/interface/deprecated/IParserV1.sol':
				{
					keccak256: '0x7aa2e2071e1362e0d3e3f121340e967dc3e66fb4334559ee9a3d7a3577036d5a',
					urls: [
						'bzz-raw://cf25e938efa4930f1467b28f07fce27161d0022c42e8848feb2ac0664a5ef30e',
						'dweb:/ipfs/QmYgwnZe7p6oyGRn1TAhEwLu9ihjksbuQcnqfix3otuQf7'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/bytecode/LibBytecode.sol':
				{
					keccak256: '0x3b9911557b694389f7afbf29857971ca8ea11dcbbda701aa63a8669549c84f3c',
					urls: [
						'bzz-raw://43fd2c2c773800d717581ac57c0267a7492ffcdf9b8ed5fd93c590a27cd86538',
						'dweb:/ipfs/QmT6vhXZXQtKoUmULUsGZ1fGTnvN8L9edzFXwh4azdpUNk'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/caller/LibContext.sol': {
				keccak256: '0x87d556cd17c477fec548af7fb1cbad2d255442647a97c1c58a97a60ac62e97cc',
				urls: [
					'bzz-raw://dcbce583ad4909061b72f90624b1fe76ab74789cb81c62e8c6b3469e7ef7b991',
					'dweb:/ipfs/QmR1r5jqevymGov1GssDdyGyacRF9Hx5ZWK6KQzpjebuhB'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/caller/LibEvaluable.sol':
				{
					keccak256: '0x4e97f1b881ed91634456ba199d9e88894aa3f2f931eedeb0372a6b2607e69cef',
					urls: [
						'bzz-raw://b28f03e348bac3e0b802e04217ec990b7e88db2022503e670f970f107a67d2a8',
						'dweb:/ipfs/QmUaEmvviNEH48ZNrhqqHGeQXAwrJSq9wyZRNoa9J5LJa6'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/deprecated/caller/LibEncodedDispatch.sol':
				{
					keccak256: '0x6f9383a7a9adbcf0c187f8dc72fc40515b29051840f4546883e337b353553b09',
					urls: [
						'bzz-raw://4c2b9cfb84d183607f841ab55ac1561e5eb48e1bab81f4694ae81a5f7147b976',
						'dweb:/ipfs/QmZzgCEwYX4f26Qi2MDP867nk3uHFzjxJexgmi4QC4VZgj'
					],
					license: 'CAL'
				},
			'lib/rain.orderbook.interface/lib/rain.interpreter.interface/src/lib/ns/LibNamespace.sol': {
				keccak256: '0xfe8f67c423d7cfcb1ba4737de311e99d17b2ecba05331c55ef58a7694b769a7d',
				urls: [
					'bzz-raw://2ff26102b07577360c2f85955f5bd0e7660317b36c21b147a748861653b64a31',
					'dweb:/ipfs/QmNSXHGSBVpJfdbdFtvAfc3H5SZB8Ro8mST7gmALRdDD9n'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/src/interface/IOrderBookV4.sol': {
				keccak256: '0x9d1c76afedc2dc040443e02ab0afbd2c94394e4c2125e218ae3643ed35cd0534',
				urls: [
					'bzz-raw://03f55f63adbde719d1a2038cbbbc3744bcba476def5cf5c986c4d7adc812351b',
					'dweb:/ipfs/QmPNwrg7fV8m9mWSTbepJcd3dafRXkFByX8HwTakkyDMDw'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/src/interface/IOrderBookV4OrderTaker.sol': {
				keccak256: '0xdf258ac1a4ee852102ffc24fbc4991b2e6960b61ec17cbdae4f50aa993cb35e2',
				urls: [
					'bzz-raw://a8d12747949ef0d4bef2e433cea2277fe696ea2856c6750bc6b784179e433682',
					'dweb:/ipfs/QmeEQqDjogCKXH7ef47fLdtfFdUobotjVybbZ1377Qj7ko'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/src/interface/deprecated/v2/IOrderBookV2.sol': {
				keccak256: '0xdb575c8c0935b3ae781ce85d35664a7917d3e543cc3a8310b265eea080862b83',
				urls: [
					'bzz-raw://4139f016ad21ff92c0f4106981e5a5f2cb5a99bd169b621b2c0705ccc6897e0d',
					'dweb:/ipfs/QmQ7FY1W68VWsSvbzVJA5TjVBGk8hJzvRMkGGJ3xYrPqGs'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/src/interface/deprecated/v3/IOrderBookV3.sol': {
				keccak256: '0x758fe28e77f234f9e3d627de4fda4b380f9d4f62974bb305b65584f0b93d24a1',
				urls: [
					'bzz-raw://fec298a7b55a64c3c8ee88d11476d18773dbedc0ba8a8668930661b4d4d55c4f',
					'dweb:/ipfs/QmXNZUuyK3mV6CGmLPRcv75xCmsfvPY6Har4SyKJpVpD7t'
				],
				license: 'CAL'
			},
			'lib/rain.orderbook.interface/src/interface/ierc3156/IERC3156FlashBorrower.sol': {
				keccak256: '0x493227b1bc21c04ba2506d8d63f8fab8eb828683cf41336db1076edee2e010a7',
				urls: [
					'bzz-raw://99b27f1f11576c22462c93ab613835522dfc89a7e28e584df034b339187bc15c',
					'dweb:/ipfs/QmQZ1H8PotScE5rSbruZn97MC6pgDNTuCQcjtg8ZWU4SPB'
				],
				license: 'CC0'
			},
			'lib/rain.orderbook.interface/src/interface/ierc3156/IERC3156FlashLender.sol': {
				keccak256: '0x1c14bc32c7483a68f5cb3ff65f64a8a32b279472525340033ce8e0b462fd1e72',
				urls: [
					'bzz-raw://e25cbc0c4512d737fd9fb32f30af0f9bcccd10f28870c927057f6bcaac213dd4',
					'dweb:/ipfs/Qmey7YDkCTMXgoRDVHUbHRH6f4MJz6mBdfucp7v7bVy1ie'
				],
				license: 'CC0'
			},
			'lib/rain.solmem/src/error/ErrUint256Array.sol': {
				keccak256: '0x450fda2ab490459d3fe695c4ea15b7916a3dbeb02fc4c01348563629c0b95459',
				urls: [
					'bzz-raw://ddeb89925ce8164087ee3ad1493034191a27d57ce6317ed418d6cd26d1241f13',
					'dweb:/ipfs/QmUMQYCuGBS57x1dM5TDZhjBxpG6Y8W1HW37RS9P5s7edh'
				],
				license: 'CAL'
			},
			'lib/rain.solmem/src/lib/LibBytes.sol': {
				keccak256: '0xcdc485d90d6d8a89a842b64c83efd15266c5c80916535736aa8a05497bcf5625',
				urls: [
					'bzz-raw://a45d0edb1d404207ad328d7a4eb16ee52d68db8dbb44796caa521a4765dfe353',
					'dweb:/ipfs/QmVT8vbFLMmD1sg1sEz21mTrDRE58yFNsmKDPnZ3LX8yYk'
				],
				license: 'CAL'
			},
			'lib/rain.solmem/src/lib/LibMemCpy.sol': {
				keccak256: '0x6a2df10cc8f19bf99711c06ddf744080d922104b2f8aab4093ca1df8849a8406',
				urls: [
					'bzz-raw://58cdb4a850867b5ae325c28cd588a98e9c0b313fb7b70974fcb9ad357f552102',
					'dweb:/ipfs/QmYvf96iHnS81aqt9sEcdvqpq6ghsk2fa8RVNBc6pttQJe'
				],
				license: 'CAL'
			},
			'lib/rain.solmem/src/lib/LibPointer.sol': {
				keccak256: '0xcd833cbf588ec10836cdfbddd426fc14dfa145ed2e63054f6bbd06e296e698f7',
				urls: [
					'bzz-raw://9ce0af4045e276c5e4c352c1c435f4ecea7552192b1d99e33732c1067bea0ad7',
					'dweb:/ipfs/Qmc5NCFTwgg2AemUz9K1fPei51ivge3eUrWP8k56kF8ADG'
				],
				license: 'CAL'
			},
			'lib/rain.solmem/src/lib/LibUint256Array.sol': {
				keccak256: '0x2780114f75234ca2c416c5bb3d1650e06d7ed4314131b8398dec3fe78fe710ae',
				urls: [
					'bzz-raw://ff01409ff93b67f5c013f2cd752a40d2897665c2b4d192c9fef448af70a984e7',
					'dweb:/ipfs/QmPb9SKLCkGUUPq5GjWCe3ziJ2SgwdGJk9q9tyh1eKF1Hn'
				],
				license: 'CAL'
			},
			'src/abstract/OrderBookV4FlashLender.sol': {
				keccak256: '0x66caaf76be139878e8c81cac9108b7312d12b08e91c76ebb7927f6757de4468f',
				urls: [
					'bzz-raw://82d2a7d741430b59e21b930029b64459d368db04c9dab17044e0f979a1c2e6a9',
					'dweb:/ipfs/QmT64t1reGrbpKhgwdCzR3TqU4qU2GhZqr19sWxKr2UYRx'
				],
				license: 'CAL'
			},
			'src/concrete/ob/OrderBook.sol': {
				keccak256: '0x0d2a57fe621ebe203da977f8af45aec2e739d7095bed25878a2f3a561aa92f28',
				urls: [
					'bzz-raw://4943b0fc3f5f84c5976c18dc397c49b3e9c2545aa96cc1934129aa95dc43be41',
					'dweb:/ipfs/QmWLmCwmV9ic8NJnhqpfJYqdE8zvX8BtaVWAy5ED6hZqwG'
				],
				license: 'CAL'
			},
			'src/lib/LibOrder.sol': {
				keccak256: '0xa0ccb0d3bf616d6459cb0f96d5ace0f65e3670eb76326961e5d320b6907d2410',
				urls: [
					'bzz-raw://7b79bb23ecf3b2ea966744efd3aba5028f96f25ed9ac33ecce13ca027e4d9467',
					'dweb:/ipfs/QmRdZuP2S7Ahu9dDhgXo4bHKPgUzNrLE9z4T3QvevvdtJs'
				],
				license: 'CAL'
			},
			'src/lib/LibOrderBook.sol': {
				keccak256: '0x41af1d6ad695d32801498832bec69b3d810c3564bf685b8640aeb5da6d6fe828',
				urls: [
					'bzz-raw://f4cd315aa6dcd70fd4aaa62329b9f034c00ecf1813b2dc30c8b8411688a41823',
					'dweb:/ipfs/QmPY8yHbDCVNvBmWbk9oGbVtFbFYr2xpZBirduJoYWs8KG'
				],
				license: 'CAL'
			}
		},
		version: 1
	},
	id: 375
};
