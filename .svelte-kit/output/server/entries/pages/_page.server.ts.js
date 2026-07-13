const load = async ({ locals }) => {
  const { data: voteWinner } = await locals.supabase.from("nominees").select("id, name, workplace, city").eq("is_winner", true).eq("approved", true).maybeSingle();
  const { data: storyWinner } = await locals.supabase.from("stories").select("id, nurse_name, workplace, city, message").eq("is_winner", true).maybeSingle();
  return { voteWinner: voteWinner ?? null, storyWinner: storyWinner ?? null };
};
export {
  load
};
