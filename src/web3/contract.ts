import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const CONTRACT_ADDRESS = "0x47A3B21b3eA6DAbAD4e3EDE568F9C1a90aD8eB4e";

export const CONTRACT_ABI = [
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "imageHash",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "title",
						"type": "string"
					}
				],
				"name": "ImageSaved",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					}
				],
				"name": "getImage",
				"outputs": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "creator",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "imageHash",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							}
						],
						"internalType": "struct ImageMarketplace.Image",
						"name": "",
						"type": "tuple"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "imageCount",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"name": "images",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "imageHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_imageHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_title",
						"type": "string"
					}
				],
				"name": "saveImage",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		];

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
};
