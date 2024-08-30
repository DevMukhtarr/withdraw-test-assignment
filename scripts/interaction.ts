import { ethers } from "hardhat";

async function main() {
    const web3CXITokenAddress = "0x227890ff600f69952b5B7d50D80E1C8608bbFf64";
    const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

    const saveERC20ContractAddress = "0x44318D5A52Bb1c4ce5a555377FeF8C7728842EEF";
    const saveERC20 = await ethers.getContractAt("ISaveERC20", saveERC20ContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
    approveTx.wait();

    const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
    console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    const depositAmount = ethers.parseUnits("150", 18);
    const depositTx = await saveERC20.deposit(depositAmount);

    console.log(depositTx);

    depositTx.wait();

    const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

    console.log("Contract balance after :::", contractBalanceAfterDeposit);



    // Withdrawal Interaction
    const WithdrawalApprovalAmount = ethers.parseUnits("200", 18);

    const approveWithdrawalTx = await web3CXI.approve(saveERC20, WithdrawalApprovalAmount);
    approveWithdrawalTx.wait();

    const contractBalanceBeforeWithdrawal = await saveERC20.getContractBalance();
    console.log("Contract balance before :::", contractBalanceBeforeWithdrawal);

    const WithdrawalAmount = ethers.parseUnits("100", 18);
    const WithdrawalTx = await saveERC20.withdraw(WithdrawalAmount);

    console.log(WithdrawalTx);
    WithdrawalTx.wait()

    const contractBalanceAfterWithdrawal = await saveERC20.getContractBalance();
    console.log("Contract balance after :::", contractBalanceAfterWithdrawal);
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
