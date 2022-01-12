const { ETH_USD } = require('./constants')
const { utils, BigNumber } = require('ethers')

module.exports.ethToUsd = (eth) => {
    return utils.formatUnits(
        BigNumber
            .from(utils.parseEther(eth))
            .mul(BigNumber.from(ETH_USD))
    )
}