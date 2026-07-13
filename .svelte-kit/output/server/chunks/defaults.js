const contentFields = [
  // Zaglavlje i podnožje
  { key: "nav_vote", group: "Zaglavlje i podnožje", label: "Navigacija: gumb „Glasaj za sestru”", default: "Glasaj za sestru" },
  { key: "nav_story", group: "Zaglavlje i podnožje", label: "Navigacija: gumb „Napiši priču”", default: "Napiši priču" },
  { key: "footer_text", group: "Zaglavlje i podnožje", label: "Podnožje: tekst", default: "najMedicinska SESTRA — priznanje sestrama za dijabetes" },
  { key: "footer_admin", group: "Zaglavlje i podnožje", label: "Podnožje: poveznica na uredništvo", default: "Uredništvo" },
  // Naslovnica
  { key: "home_hero_title", group: "Naslovnica", label: "Glavni naslov", multiline: true, default: "Zahvalimo sestrama koje čine razliku." },
  { key: "home_hero_subtitle", group: "Naslovnica", label: "Podnaslov ispod glavnog naslova", multiline: true, default: "Predložite medicinsku sestru koja vam je svojim znanjem i ljudskošću ostavila trag; a mi ćemo dvije odvesti u Pariz na konferenciju o dijabetesu!" },
  { key: "home_card1_title", group: "Naslovnica", label: "1. kartica — naslov", default: "Priznanje pacijenata" },
  { key: "home_card1_text", group: "Naslovnica", label: "1. kartica — tekst", multiline: true, default: "Nominirajte medicinsku sestru koja je svojim radom i podrškom ostavila poseban trag u vašem životu." },
  { key: "home_card1_button", group: "Naslovnica", label: "1. kartica — gumb", default: "Predloži sestru" },
  { key: "home_card2_title", group: "Naslovnica", label: "2. kartica — naslov", default: "Priča koja inspirira" },
  { key: "home_card2_text", group: "Naslovnica", label: "2. kartica — tekst", multiline: true, default: "Podijelite svoju osobnu priču o medicinskoj sestri koja je pokazala iznimnu predanost, stručnost i ljudskost." },
  { key: "home_card2_button", group: "Naslovnica", label: "2. kartica — gumb", default: "Napiši svoju priču" },
  { key: "home_privacy", group: "Naslovnica", label: "Napomena o privatnosti", multiline: true, default: "Vaši podaci su sigurni i koristimo ih isključivo u svrhu ovog projekta." },
  // Naslovnica — pobjednice
  { key: "home_winners_badge", group: "Naslovnica — pobjednice", label: "Oznaka (badge)", default: "Pobjednice" },
  { key: "home_winners_title", group: "Naslovnica — pobjednice", label: "Naslov", default: "Čestitamo našim pobjednicama" },
  { key: "home_winners_subtitle", group: "Naslovnica — pobjednice", label: "Podnaslov", multiline: true, default: "Hvala svima koji su glasali i podijelili svoje priče. Ovo su sestre koje su ostavile najveći trag." },
  { key: "home_winners_vote_label", group: "Naslovnica — pobjednice", label: "Oznaka: nagrada pacijenata", default: "Nagrada pacijenata" },
  { key: "home_winners_vote_caption", group: "Naslovnica — pobjednice", label: "Opis pobjednice glasanja", multiline: true, default: "Sestra s najviše glasova pacijenata i njihovih obitelji." },
  { key: "home_winners_story_label", group: "Naslovnica — pobjednice", label: "Oznaka: priča koja inspirira", default: "Priča koja inspirira" },
  // Obrazac: Glasanje
  { key: "vote_title", group: "Obrazac: Glasanje", label: "Naslov obrasca", default: "Nominacija – Priznanje pacijenata" },
  { key: "vote_subtitle", group: "Obrazac: Glasanje", label: "Podnaslov obrasca", multiline: true, default: "Ispunite obrazac i predložite medicinsku sestru." },
  { key: "vote_button", group: "Obrazac: Glasanje", label: "Gumb za slanje", default: "Pošalji nominaciju" },
  { key: "vote_success_title", group: "Obrazac: Glasanje", label: "Naslov nakon uspješnog slanja", default: "Hvala! Vaš glas je zabilježen." },
  { key: "vote_success_text", group: "Obrazac: Glasanje", label: "Poruka nakon uspješnog slanja", multiline: true, default: "Svaki posjetitelj ima jedan glas. Podijelite stranicu kako bi i drugi glasali." },
  // Obrazac: Priča
  { key: "story_title", group: "Obrazac: Priča", label: "Naslov obrasca", default: "Priča koja inspirira" },
  { key: "story_subtitle", group: "Obrazac: Priča", label: "Podnaslov obrasca", multiline: true, default: "Podijelite svoju priču o medicinskoj sestri." },
  { key: "story_button", group: "Obrazac: Priča", label: "Gumb za slanje", default: "Pošalji priču" },
  { key: "story_success_title", group: "Obrazac: Priča", label: "Naslov nakon uspješnog slanja", default: "Hvala! Vaša priča je poslana." },
  { key: "story_success_text", group: "Obrazac: Priča", label: "Poruka nakon uspješnog slanja", multiline: true, default: "Naše uredništvo pažljivo čita svaku priču prije objave." }
];
const defaultContent = Object.fromEntries(
  contentFields.map((f) => [f.key, f.default])
);
[...new Set(contentFields.map((f) => f.group))];
export {
  contentFields as c,
  defaultContent as d
};
