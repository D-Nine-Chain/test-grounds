const { blake2AsU8a, encodeAddress, decodeAddress } = require('@polkadot/util-crypto');
const { u8aToHex, u8aConcat } = require('@polkadot/util');
import { createTypeUnsafe, TypeRegistry } from '@polkadot/types';

function calculateMultiSigAddress(signatoryAddresses: any, ss58Format = 9) {
    const registry = new TypeRegistry();

    // First decode all addresses from ss58 format to their raw public keys
    const decodedSignatories = signatoryAddresses.map((addr: any) =>
        decodeAddress(addr)
    );

    // sort
    const sortedSignatories = [...decodedSignatories].sort((a, b) =>
        u8aToHex(a).localeCompare(u8aToHex(b))
    );

    // Create a Vec<AccountId> type and encode the sorted public keys
    const encodedSignatories = createTypeUnsafe(registry, 'Vec<AccountId>', [
        sortedSignatories.map(pubkey => u8aToHex(pubkey))
    ]).toU8a();

    // Convert the prefix to Uint8Array
    const prefix = new TextEncoder().encode('d9-multi-sig:v1');

    // Concatenate the arrays
    const combined = u8aConcat(prefix, encodedSignatories);

    // Calculate blake2-256 hash
    const entropy = blake2AsU8a(combined, 256);

    // Generate address from the entropy
    const address = encodeAddress(entropy, ss58Format);

    return {
        address,
        entropyBytes: entropy,
        entropyHex: u8aToHex(entropy),
        encodedSignatoriesHex: u8aToHex(encodedSignatories)
    };
}

// Example usage:
const signatories = [
    "v13n2yeidohw7TFL8f9KojG1CcTuGMnbyFxuaFacvZNYQ7U",
    "wPopfjUUuoiGVQ96NpAvpfZBQ2v6sRs1T3k4FtmixQaNP5K",
    "wQFyE6CDRCCL8GwRPybnYpovSftNMMjnB5xbB915sSdUc9f"
];

// Calculate the multisig address (using ss58Format 9 for the output address)
const result = calculateMultiSigAddress(signatories);
console.log('Multisig Address:', result.address);
