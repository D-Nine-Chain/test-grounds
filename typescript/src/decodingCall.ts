import { hexToU8a } from '@polkadot/util';
import type { AnyJson } from '@polkadot/types/types';
import type { Call } from '@polkadot/types/interfaces';
import type { Registry } from '@polkadot/types/types';
import { ApiPromise } from '@polkadot/api';
import { getApi } from '.';

interface DecodedCall {
    section: string;
    method: string;
    args: any;
    hash: string;
    raw: Uint8Array;
}


/**
 * Decodes a bounded call that was encoded in Substrate
 * @param registry - The type registry containing chain types
 * @param encodedCall - The encoded call data (hex string or Uint8Array)
 * @returns Decoded call information
 */
function decodeBoundedCall(
    api: ApiPromise,
    encodedCall: string | Uint8Array
): DecodedCall {
    try {
        // Convert input to Uint8Array if it's a hex string
        const callData = typeof encodedCall === 'string'
            ? hexToU8a(encodedCall)
            : encodedCall;

        // Create and decode the call using the API's createType
        const call = api.createType('Call', callData);

        return {
            section: call.section.toString(),
            method: call.method.toString(),
            args: call.args.toString() as AnyJson,
            hash: call.hash.toHex(),
            raw: callData
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to decode bounded call: ${errorMessage}`);
    }
}

// Main execution
(async () => {
    try {
        const api = await getApi();
        await api.isReady;
        // Log metadata version and available calls for debugging

        const encodedCall = "0x050700321ead74028c54fece14ef36553b8fac03de30ad7e01a7217383e74a189a297e070010a5d4e8";
        console.log('\nTrying to decode call...');

        // Try to decode the call
        const result = decodeBoundedCall(api, encodedCall);
        console.log('Successfully decoded call:', result);

        // Log detailed call information
        console.log('\nDetailed call information:');
        console.log('Section:', result.section);
        console.log('Method:', result.method);
        console.log('Arguments:', JSON.stringify(result.args, null, 2));

    } catch (error) {
        console.error('Error:', error);

        if (error instanceof Error && error.message.includes('findMetaCall')) {
            console.error('\nThis error usually means the call index is not found in the metadata.');
            console.error('Please verify that:');
            console.error('1. The API is connected to the correct chain');
            console.error('2. The runtime version matches the encoded call');
            console.error('3. The pallet and call indices exist in the metadata');
        }
    }
})();

export { decodeBoundedCall, type DecodedCall };