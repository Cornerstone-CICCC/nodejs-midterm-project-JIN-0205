import axios from "axios";

interface TranslationResponse {
  data: {
    translations: Array<{ translatedText: string }>;
  };
}

const translateText = async (
  text: string,
  targetLang: string = "ja"
): Promise<string> => {
  const apiKey = import.meta.env.VITE_TRANSLATE_API_KEY;
  try {
    const res = await axios.post<TranslationResponse>(
      `https://translation.googleapis.com/language/translate/v2`,
      null,
      {
        params: {
          q: text,
          target: targetLang,
          key: apiKey,
        },
      }
    );
    return res.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "translation error";
  }
};

export default translateText;
