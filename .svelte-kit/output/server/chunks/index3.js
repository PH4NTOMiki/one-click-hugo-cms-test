import { d as defaultContent } from "./defaults.js";
const nav_vote = "Glasaj za sestru";
const nav_story = "Napiši priču";
const footer_text = "najMedicinska SESTRA — priznanje sestrama za dijabetes";
const footer_admin = "Uredništvo";
const home_hero_title = "Zahvalimo sestrama koje čine razliku.";
const home_hero_subtitle = "Predložite medicinsku sestru koja vam je svojim znanjem i ljudskošću ostavila trag; a mi ćemo dvije odvesti u Pariz na konferenciju o dijabetesu!";
const home_card1_title = "Priznanje pacijenata";
const home_card1_text = "Nominirajte medicinsku sestru koja je svojim radom i podrškom ostavila poseban trag u vašem životu.";
const home_card1_button = "Predloži sestru";
const home_card2_title = "Priča koja inspirira";
const home_card2_text = "Podijelite svoju osobnu priču o medicinskoj sestri koja je pokazala iznimnu predanost, stručnost i ljudskost.";
const home_card2_button = "Napiši svoju priču";
const home_privacy = "Vaši podaci su sigurni i koristimo ih isključivo u svrhu ovog projekta.";
const home_winners_badge = "Pobjednice";
const home_winners_title = "Čestitamo našim pobjednicama";
const home_winners_subtitle = "Hvala svima koji su glasali i podijelili svoje priče. Ovo su sestre koje su ostavile najveći trag.";
const home_winners_vote_label = "Nagrada pacijenata";
const home_winners_vote_caption = "Sestra s najviše glasova pacijenata i njihovih obitelji.";
const home_winners_story_label = "Priča koja inspirira";
const vote_title = "Nominacija – Priznanje pacijenata";
const vote_subtitle = "Ispunite obrazac i predložite medicinsku sestru.";
const vote_button = "Pošalji nominaciju";
const vote_success_title = "Hvala! Vaš glas je zabilježen.";
const vote_success_text = "Svaki posjetitelj ima jedan glas. Podijelite stranicu kako bi i drugi glasali.";
const story_title = "Priča koja inspirira";
const story_subtitle = "Podijelite svoju priču o medicinskoj sestri.";
const story_button = "Pošalji priču";
const story_success_title = "Hvala! Vaša priča je poslana.";
const story_success_text = "Naše uredništvo pažljivo čita svaku priču prije objave.";
const generated = {
  nav_vote,
  nav_story,
  footer_text,
  footer_admin,
  home_hero_title,
  home_hero_subtitle,
  home_card1_title,
  home_card1_text,
  home_card1_button,
  home_card2_title,
  home_card2_text,
  home_card2_button,
  home_privacy,
  home_winners_badge,
  home_winners_title,
  home_winners_subtitle,
  home_winners_vote_label,
  home_winners_vote_caption,
  home_winners_story_label,
  vote_title,
  vote_subtitle,
  vote_button,
  vote_success_title,
  vote_success_text,
  story_title,
  story_subtitle,
  story_button,
  story_success_title,
  story_success_text
};
const merged = { ...defaultContent, ...generated };
function t(key) {
  return merged[key] ?? defaultContent[key] ?? "";
}
export {
  t
};
