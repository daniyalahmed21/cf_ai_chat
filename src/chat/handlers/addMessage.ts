
export async function addMessage(state: DurableObjectState, request: Request) {
  const { message } = await request.json<{ message: string }>();
  let history = (await state.storage.get<string[]>('messages')) || [];

  history.push(message);
  history = history.slice(-10);

  await state.storage.put('messages', history);

  return Response.json({ status: "ok", history });
}
