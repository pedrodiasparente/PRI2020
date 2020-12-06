//

function moreFiles() {
    var file = '<file><input class="w3-input w3-border w3-light-grey" type="file" name="myFile"></file>'

    $('files').append(file)
}

function lessFiles() {

    $('file').last().remove()
    
}