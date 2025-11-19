
export async function getSize(state: DurableObjectState) {
  const history = (await state.storage.get<string[]>('messages')) || [];
  return Response.json({ count: history.length });
}
