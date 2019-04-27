(function () {
  "use strict";

  let hideToggle;
  let dataTable;

  document.addEventListener("DOMContentLoaded", function () {
    hideToggle = document.getElementById("hideToggle");
    dataTable = document.getElementById("treasureDataTable")

    markAsFoundFromStorage();

    hideToggle.addEventListener("change", toggleHideRows);
    document.querySelectorAll("input[type='checkbox'][name='status']").forEach(box => box.addEventListener("change", toggleAsFound));
  });

  function markAsFoundFromStorage() {
    let foundTreasures = findFoundTreasures();
    if (foundTreasures === null) return;
    foundTreasures.forEach(hash => {
      const tableRow = dataTable.querySelector(`tr[data-hash='${hash}']`);
      markAsFound(tableRow);
      tableRow.querySelector("input[type='checkbox']").checked = true;
    });
  }

  function toggleAsFound(event) {
    const checkbox = event.target;
    const tableRow = checkbox.closest("tr");

    if (checkbox.checked) {
      markAsFound(tableRow);
      saveHash(tableRow.dataset.hash);
    } else {
      clearMark(tableRow)
    }
  }

  function markAsFound(tableRow) {
    tableRow.classList.add("found");
    if (hideToggle.checked) tableRow.classList.add("hidden");
  }

  function clearMark(tableRow) {
    tableRow.classList.remove("found");
    tableRow.classList.remove("hidden");

    let foundTreasures = findFoundTreasures();
    if (foundTreasures === null) return;
    foundTreasures = foundTreasures.filter(e => e !== tableRow.dataset.hash);
    saveFoundTreasures(foundTreasures);
  }

  function saveHash(hash) {
    let foundTreasures = findFoundTreasures();
    foundTreasures = foundTreasures === null ? [] : foundTreasures;
    foundTreasures.push(hash);
    saveFoundTreasures(foundTreasures);
  }

  function removeHash(hash) {
    let foundTreasures = findFoundTreasures();
    if (foundTreasures === null) return;
    foundTreasures = foundTreasures.filter(e => e !== hash);
    saveFoundTreasures(foundTreasures);
  }

  function findFoundTreasures() {
    return JSON.parse(localStorage.getItem("foundTreasures"));
  }

  function saveFoundTreasures(foundTreasures) {
    localStorage.setItem("foundTreasures", JSON.stringify(foundTreasures));
  }

  function toggleHideRows() {
    const rows = dataTable.querySelectorAll("tr.found")

    if (hideToggle.checked) {
      rows.forEach(row => row.classList.add("hidden"));
    } else {
      rows.forEach(row => row.classList.remove("hidden"));
    }
  }
})();
