/* Mapa modelu – komponenty modelu (Maciej Buczak | Risk Research). Sekcja: [nr, tytuł, ikona, opis, [[podgrupa, [[element, dopisek]]]]] */
window.RT_MODEL=[
 ["01","Informacje o modelu","id","Metryka modelu: czym jest, czyj jest i gdzie działa.",[
  ["",[["Nazwa modelu","np. ryzyko operacyjne – AMA"],["Obszar ryzyka",""],["Obszar koncepcji","np. wartość nieoczekiwana"],["Istotność","np. istotny"],["Właściciel modelu",""],["Zakres stosowania","produkty, procesy"],["Pochodzenie modelu","wewnętrzne / zewnętrzne"],["Środowisko produkcyjne",""],["Proces biznesowy",""]]]]],
 ["02","Cel modelu","target","Po co model powstał i jak będzie używany jego wynik.",[
  ["",[["Cel biznesowy",""],["Cel zarządu","zgodny z głównym celem? inna percepcja?"],["Co jest wynikiem modelu",""],["Jak wynik będzie stosowany",""]]]]],
 ["03","Koncepcja modelu","bulb","Otoczenie, warunki brzegowe, wybrana koncepcja i jej alternatywy.",[
  ["Otoczenie koncepcji",[["Kontekst regulacyjny",""],["Koncepcje na rynku",""],["Mody w modelowaniu",""],["Zalecenia regulatora",""],["Zalecenia walidacji",""],["Zalecenia audytu",""]]],
  ["Warunki brzegowe",[["Techniczne","narzędzia / środowiska"],["Osobowe","czy mamy ludzi?"],["Procesowe","czy mamy procesy?"]]],
  ["Koncepcja modelu",[["Założenia",""],["Budowa modelu","modułowa – typ"],["Ugruntowanie w nauce",""],["Koncepcja",""],["Metody statystyczne",""],["Typ modelu","klasyczny / algorytmiczny (black box)"]]],
  ["Złożoność modelu",[["Poziom złożoności",""],["Złożoność – ryzyka",""]]],
  ["Koncepcje alternatywne",[["Inne podejścia",""],["Dlaczego wybrano tę koncepcję",""]]]]],
 ["04","Dane","db","Skąd pochodzą dane i jak model radzi sobie z ich problemami.",[
  ["Źródła danych",[["Dane do estymacji",""],["Dane produkcyjne",""]]],
  ["",[["Pochodzenie danych","wewnętrzne / zewnętrzne"],["Integracja z procesem obliczeniowym",""],["Obsługa problemu – braki danych",""],["Obsługa problemu – niska jakość",""]]]]],
 ["05","Model statystyczny","sigma","Próba, segmentacja, zmienne, parametry, estymacja i wynik – serce modelu.",[
  ["Próba modelu",[["Skalowanie",""],["Filtrowanie",""],["Progi danych",""],["Przekształcenia danych",""],["Dane zewnętrzne – dostosowanie",""],["Minimalna próba",""],["Kohorty",""],["TTC / PIT",""],["Dane eksperckie",""]]],
  ["Segmentacja",[["Oś segmentacji","produkty / kanały"],["Kryteria segmentacji",""],["Poziom granularności",""],["Ocena logiki biznesowej segmentacji",""]]],
  ["Łączenie segmentów",[["Segment → model","inne modele w segmencie"],["Homogeniczność vs minimalna liczebność",""]]],
  ["Zmienne modelu",[["Jakie zmienne",""],["Typy zmiennych",""],["Czy zmienne zasilają proces?","w bieżących przeliczeniach"],["Czy objaśniamy zmienne innymi zmiennymi?",""]]],
  ["Parametry modelu",[["Jakie parametry → zmienne",""],["Częstotliwość aktualizacji",""]]],
  ["Problemy z danymi",[["Peaki, truncated, censored",""],["Braki danych – uzupełnianie",""],["Wartości skrajne",""]]],
  ["Jakość danych",[["Homogeniczność",""],["Reprezentatywność – czas",""],["Reprezentatywność – przestrzeń",""]]],
  ["Próby",[["Próba do nauki / testowa",""],["Próba modelowa / walidacyjna",""],["Out of time",""],["Out of sample",""],["Przesuwające się okno danych",""],["Różne długości okien danych",""]]],
  ["Proces estymacji",[["Funkcja celu",""],["Metoda estymacji",""],["Wybór metody estymacji",""],["Podejście liczbowe / wolumenowe",""],["Złamanie zasad statystyki?",""],["Metoda → koncepcja",""]]],
  ["Wynik modelu",[["Jak wykorzystywany",""],["Skala wartości wyniku",""],["Poziomy alertowe",""]]],
  ["Wrażliwość parametrów",[["Błędy szacunku",""],["Przedziały ufności",""]]],
  ["Korekty parametrów",[["Bufory na parametry",""],["Parametry eksperckie",""]]],
  ["Pułapki estymacyjne",[["Ekstrema lokalne, autokorelacje, sumowanie okresów",""],["Wielkość próby → parametry",""],["Rozkład parametrów",""],["Transfer: parametry – wynik modelu",""]]]]],
 ["06","Weryfikacja modelu","check","Statystyka, poprawność, koncepcja i logika biznesowa – czy model działa i czy rozumiemy dlaczego.",[
  ["Weryfikacja statystyczna",[["Backtest",""],["Analiza wrażliwości",""],["Analiza stabilności",""],["Moc dyskryminacyjna",""],["Benchmarking",""],["Stress testing",""]]],
  ["Weryfikacja poprawności",[["Czy korekty parametrów?",""],["Niepewność pod kontrolą",""],["Czy testy OK?","KS, χ², ocena graficzna, błędy szacunku"],["Logika parametrów",""],["Wyniki → logika biznesowa",""],["Rozumiemy odczyt modelu",""]]],
  ["Weryfikacja koncepcji",[["Środek ciężkości modelu",""],["Poziom szczegółowości",""],["Rozumiemy mechanikę modelu?",""],["Zakres wyników modelu",""],["Wrażliwość ← zmienne","czy pod kontrolą"],["Wrażliwość ← parametry","czy pod kontrolą"]]],
  ["Weryfikacja logiki biznesowej",[["Kierunki zależności","wyższy dochód → niższe ryzyko"],["Monotoniczność parametrów",""],["Czy są paradoksy?",""],["Przypadki brzegowe","zachowanie dla wartości ekstremalnych"],["Zgodność z intuicją ekspertów",""],["Stabilność w czasie","czy relacje są trwałe"],["Interpretowalność","wyników i parametrów"],["Czy model nie dyskryminuje?","fairness, bias"]]]]],
 ["07","Wdrożenie modelu","rocket","Gdzie i jak model działa produkcyjnie i kto z niego korzysta.",[
  ["Środowisko produkcyjne",[["Typ środowiska",""],["Typ wdrożenia","kod przepisany, zintegrowany, parametry"],["Jak korzysta ostateczny użytkownik",""]]],
  ["Proces biznesowy",[["Jaki proces",""],["Użytkownicy",""],["Sposób korzystania",""]]]]],
 ["08","Elementy składowe modelu","puzzle","Kod, administracja, dokumentacja, ocena jakości i proces zarządzania ryzykiem modeli.",[
  ["Kod modelu",[["Środowisko – dane",""],["Środowisko – obliczenia",""],["Jeden kod – wiele kodów",""],["Jakość kodu",""],["Czytelność kodu",""],["Replikacja?","lub zgodność z dokumentacją"]]],
  ["Elementy administracyjne",[["Karta modelu",""],["Dziennik modelu",""],["Harmonogram modelu",""],["Status zaleceń KNF",""],["Status zaleceń KW",""],["Zarządzanie zmianą",""]]],
  ["Dokumentacja modelu",[["Metodyka modelu",""],["Dokumentacja modelu",""],["Dokumentacja techniczna",""]]],
  ["Ocena jakości modelu",[["Analiza jakości modelu",""],["Analiza jakości danych",""],["Ocena finalna",""]]],
  ["Proces zarządzania ryzykiem modeli",[["Czy to model?","a może tylko kalkulator?"],["Uzgodnienia z JW",""],["Harmonogram wdrożenia – ustalenia",""],["Harmonogram vs cele biznesowe",""],["Zasoby na stworzenie dokumentacji",""],["Plan cyklu życia modelu","czy zaplanowaliśmy"],["Wszyscy interesariusze","czy uwzględniliśmy"]]]]],
 ["09","Dokumentacja wdrożeniowa","doc","Dokumenty, które zamykają wdrożenie i otwierają akceptację.",[
  ["",[["Testy wdrożeniowe",""],["Raport z wdrożenia technicznego",""],["Raport z wdrożenia procesowego",""],["Wniosek o akceptację modelu",""]]]]],
 ["10","Dokumentacja administracyjna","folder","Jak model jest utrzymywany: jakość, dane, zmiany i zasilanie.",[
  ["",[["Zarządzanie jakością modelu","metodyka monitoringu, testy, kryteria akceptacji"],["Zarządzanie jakością danych",""],["Zarządzanie zmianą",""],["Wersjonowanie",""],["Proces zasilania produkcyjnego","jak model zasilany jest danymi"],["Proces SKW",""]]]]]];
