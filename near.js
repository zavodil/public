async function nearView(recipient, method, params) {
    console.log("Parent near View", recipient, method, params)

     if (!recipient || !method)
        return console.error("No data to parent NearView")

    try {
        let rpc = "https://rpc.mainnet.near.org";
        const nearRpc = new nearApi.providers.JsonRpcProvider({url: rpc});

        const account = new nearApi.Account({
                provider: nearRpc,
                networkId: 'mainnet',
                signer: recipient,
                headers:  {}
            },
            recipient);
        return await account.viewFunction(
            recipient,
            method,
            params
        );
    } catch (e) {
        return console.log(e);
    }
}
