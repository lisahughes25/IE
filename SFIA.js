<div>
<style>
.button {
  background-color: #0c1f99;
  border: none;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>

<script>
    
function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(csvFile, filename);
    }
    else {
	    // Download link
	    downloadLink = document.createElement("a");

	    // File name
	    downloadLink.download = filename;

	    // We have to create a link to the file
	    downloadLink.href = window.URL.createObjectURL(csvFile);

	    // Make sure that the link is not displayed
	    downloadLink.style.display = "none";

	    // Add the link to your DOM
	    document.body.appendChild(downloadLink);

	    // Lanzamos
	    downloadLink.click();
    }
}

function export_table_to_csv(subform, filename) {
	var csv = [];
	var rows = document.querySelectorAll("[data-field-name="+subform+"]  table tr");
	
    for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length; j++) 
            row.push('"' + cols[j].innerText.trim() + '"');
        
		csv.push(row.join(","));		
	}

    // Download CSV
    download_csv(csv.join("\n"), filename);
}

</script>
</div>
<div> <button class="button" id="download_1" onclick="export_table_to_csv('SFIA_Records', 'SFIA_Records.csv')">Download CSV</button></div>
