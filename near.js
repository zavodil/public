function walletSelectorLogin() {
    window.modal.show()
}

window.nearView = async function nearView(recipient, method, params) {
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

window.nearCall = async (recipient, method, params, gas, deposit) => {
    console.log("Parent near Call", recipient, method, params, gas, deposit)

    if (window.selector && !window.selector.isSignedIn()) {
        console.error("Login required");
        return walletSelectorLogin();
    }

    if (!recipient || !method)
        return console.error("No data to parent nearCall")

    try {
        const wallet = await selector.wallet();
        let accountId = (await wallet.getAccounts())[0];

        let real_gas = (Number(gas || "30") * 10 ** 12).toFixed(0)
        if (!real_gas) {
            real_gas = "30000000000000"
        }
        let real_deposit = nearApi.utils.format.parseNearAmount((deposit || "0").toString())
        if (!real_deposit) {
            real_deposit = "0"
        }

        return wallet.signAndSendTransaction({
            signerId: accountId,
            receiverId: recipient,
            actions: [
                {
                    type: "FunctionCall",
                    params: {
                        methodName: method,
                        args: params,
                        gas: real_gas,
                        deposit: real_deposit,
                    },
                }]
        });
    } catch (e) {
        return console.log("nearCall e", e);
    }
}
