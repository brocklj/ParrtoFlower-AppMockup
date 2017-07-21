var plants = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': './plant_db.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var txt = plants;
 var imgempty = "http://placehold.it/800x600";
function plants_list(arr) {
  var ot = ""
 
	$.each(plants, function(i, arr) {

	
		ot += '<a data-toggle="modal" onclick="plant_det('+ i +')" data-target="#plant_det"><div class="col-xs-15 col-sm-4 mix category_' + arr.group + '"><div data-cat="' + arr.group + '" ><div class="thumbnail btn btn-default"><div class="caption"><div class="list_img"><img src="'+ (arr.img || imgempty) + '" class="img-responsive" width="312" height="234" alt="..." ></div><p class="lead"><h3>' + arr.name + '</h3></p><div class="text-center"><span class="glyphicon glyphicon-map-marker"> </span>  <small class="badge">' + arr.loc +'</small><br><span class="glyphicon glyphicon-check"><br></span> <div class="label label-warning">Warning: 2</div> <div class="label label-danger">critical: 3</div><br></div></div>  </div> </div></div></a>';
		
		});
    
    document.getElementById("Grid").innerHTML = ot;
}
<!-- Inser data into detail modal -->
function plant_det(index) {
	var name = plants[index].name;
	var loc = plants[index].loc;
	var pic = ( plants[index].img || imgempty);
	document.getElementById("det_plant_name").innerHTML = name;
	document.getElementById("det_loc").innerHTML = loc;
	document.getElementById("det_img").src = pic;
	document.getElementById("myModalLabel").innerText = name +' - '+ loc;
	 document.getElementById("plant_del").innerHTML = '<a href="#" onclick="plant_delete('+index+');"><div class="glyphicon glyphicon-trash"></div>Smazat květinu</a>';
	 document.getElementById("plant_edit").innerHTML ='<a href="#" data-target="#plant_add_form" data-dismiss="modal" data-toggle="modal" onclick="plant_edit('+index+');"><div class="glyphicon glyphicon-pencil" data-dismiss="modal"></div>Editovat</a>';
		
}
<!--//* Inser data into detail modal -->

function plant_delete(indexx) {
	"use strict";
	var id = indexx;
	if (confirm('Opravdu chcete '+plants[id].name+' - '+plants[id].loc+' smazat?')) { 
   $.post("json.php", {id: id, action: "delete"}, function(result){
        $("span").html(result);
		location.reload();
   
    });}
	
}

<!--* Edit plant detail -->

function plant_edit(index) { 
	"use strict";
	var id = index;
	
	document.getElementById("ModalLabel").innerHTML = 'Editovat - '+ plants[id].name; +'';
	document.getElementById("name").value = plants[id].name;
	document.getElementById("group").value = plants[id].group;
	document.getElementById("loc").value = plants[id].loc;
	document.getElementById("url").value = plants[id].img;
	document.getElementById("add_new").style = "display: none;";
	document.getElementById("edit_save").innerHTML = '<button type="button" class="btn btn-primary" onclick="edit_save('+index+');">Uložit</button>'; 
	

	
	
}
function edit_save(id){
		"use strict";
		 var name = $("#name").val();
	var loc = $("#loc").val();
	var group = $("#group").val();
	var url = $("#url").val();
   $.post("json.php", {id: id, action: "edit", name: name, loc: loc, group: group, url: url}, function(result){
        $("span").html(result);
		location.reload();
		});
		
	}

<!--/end/* Edit plant detail -->
function add_new() {
	document.getElementById("ModalLabel").innerHTML = 'Přidat novou rostlinu';
	document.getElementById("name").value = null;
	document.getElementById("group").value = null;
	document.getElementById("loc").value = null;
	document.getElementById("url").value = null;
	document.getElementById("add_new").style = "display: -webkit-inline-box;";
	document.getElementById("edit_save").style = "display: none;";
}

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
	plants_list(plants);
	

$("#add_new").click(function(){
    var name = $("#name").val();
	var loc = $("#loc").val();
	var group = $("#group").val();
	var url = $("#url").val();
    $.post("json.php", {name: name, loc: loc, group: group, url: url, action: "add_plant"}, function(result){
        $("span").html(result);
		location.reload();
    });
});
});