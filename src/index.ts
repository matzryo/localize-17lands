import nameCorrespondence from "../data/MOM.json" assert { type: "json" };

interface PairOfCardNames {
  nameEn: string;
  nameJa: string;
}

var writeTogether = ({ nameEn, nameJa }: PairOfCardNames) =>
  [nameEn, nameJa].join(" / ");

var cardNameCells = document.querySelectorAll<HTMLDivElement>(
  "table .list_card_name"
);

nameCorrespondence.forEach((names) => {
  cardNameCells.forEach((cell) => {
    if (cell.textContent === names.nameEn) {
      cell.textContent = writeTogether(names);
    }
  });
});
