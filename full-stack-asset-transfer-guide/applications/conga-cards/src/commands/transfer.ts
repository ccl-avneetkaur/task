/*
 * Copyright contributors to the Hyperledgendary Full Stack Asset Transfer Guide project
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gateway } from '@hyperledger/fabric-gateway';
import { CHAINCODE_NAME, CHANNEL_NAME } from '../config';
import { AssetTransfer } from '../contract';
import { assertAllDefined } from '../utils';

export default async function main(gateway: Gateway, args: string[]): Promise<void> {
    const [assetId, newOwner, newOwnerOrg] = assertAllDefined([args[0], args[1], args[2]], 'Arguments: <assetId> <ownerName> <ownerMspId>');

    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    const smartContract = new AssetTransfer(contract);
    await smartContract.transferAsset(assetId, newOwner, newOwnerOrg);
}
