import supabase, { supabaseCanbinsBuckName, supabaseUrl } from "./supabase";

export const getAllCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw error;
  return data;
};

export const deleteCabin = async (id) => {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw error;
  return data;
};

export const updateCabin = async () => {
  const { data, error } = await supabase
    .from("cabins")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();
  if (error) throw error;
  return data;
};

export const upsertCabin = async (cabin, id) => {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Date.now()}.jpg`;
  const imageUrl = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/${supabaseCanbinsBuckName}/${imageName}`;

  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...cabin, image: imageUrl }]);
  } else {
    query = query.update({ ...cabin, image: imageUrl }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) throw error;
  // upload file
  if (hasImagePath) return data;
  if (cabin.image) {
    const { error } = await supabase.storage
      .from(supabaseCanbinsBuckName)
      .upload(imageName, cabin.image);
    if (error && !id) {
      await supabase.from("cabins").delete().eq("id", data.id);
    }
  }
  return data;

};
