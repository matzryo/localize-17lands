import nameCorrespondence from "../data/ONE.json" assert { type: "json" };

var writeTogether = ({ nameEn, nameJa }) => [nameEn, nameJa].join(" / ");

var cardNameCells = document.querySelectorAll("table .list_card_name");

nameCorrespondence.data.forEach((names) => {
  cardNameCells.forEach((cell) => {
    if (cell.textContent === names.nameEn) {
      cell.textContent = writeTogether(names);
    }
  });
});
