export const updateBlockCount = async (state: any, dispatch: any) => {
  const blockCount = await state.nodeProvider.getBlockNumber();
    console.log('blockCount', blockCount);
    dispatch({
      type: 'updateBlockCount',
      value: blockCount
    })
}