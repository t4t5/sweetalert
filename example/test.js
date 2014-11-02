function test(){
    swal({
        title:'hello world',
        text:'this should be interesting',
        body:'<button onclick="addrow">Add Row</button><table></table>',
        type:'success',
        buttonActions:{
            twizzle:function(e){
                console.log(e.target, "from buttonActions");
            }
        },
        showCancelButton:true,
        confirmButtonText:"fuck ya",
        cancelButtonText:"shit no"
    });
}
function twizzle(e){
    console.log(e.target);
}
function addrow(e){
    var table = e.target.parentNode.querySelector('table'),
        row = table.insertRow(),
        cell1 = row.insertCell(0),
        cell2 = row.insertCell(1);
    cell1.innerHTML = table.querySelectorAll('tr').length;
    cell2.innerHTML = '<button onclick="delrow">Delete Row</button>';
}
function delrow(e){
    var btnCell = e.target.parentNode,
        row = btnCell.parentNode,
        table = row.parentNode,
        index = row.rowIndex;
    console.log(index);
    swal({
        title:'Delete Row ' + index + '?',
        text:"Are You Sure You want to delete this row",
        showCancelButton:true,
        confirmButtonText:"I'm Sure",
        displayImmediately:true
    }, function(){
        console.log("deleting");
        table.deleteRow(index);
    });
}
    