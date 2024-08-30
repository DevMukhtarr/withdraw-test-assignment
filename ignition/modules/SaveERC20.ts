import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x227890ff600f69952b5B7d50D80E1C8608bbFf64";

const SaveERC20Module = buildModule("SaveERC20Module", (m) => {

    const save = m.contract("SaveERC20", [tokenAddress]);

    return { save };
});

export default SaveERC20Module;

// Deployed SaveERC20: 0xD410219f5C87247d3F109695275A70Da7805f1b1
