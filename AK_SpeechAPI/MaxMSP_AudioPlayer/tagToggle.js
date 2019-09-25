inlets = 1;
outlets = 2;

var _tags = [];

function setTags()
{
	_tags = arrayfromargs(arguments);
}

function tagToggle()
{
	var found_tags = arrayfromargs(arguments);
	
	if(found_tags.length == 0)
	{
		for(var k = 0; k < _tags.length; k++)
		{
			outlet(0, "tag", _tags[k], 0); 
		}

		
		
		
	
	}
	for(var k = 0; k < _tags.length; k++)
	{
		if( isInArray(found_tags, _tags[k]) )
		{
			outlet(0, "tag", _tags[k], 1);
		}
		else
		{ 
			outlet(0, "tag", _tags[k], 0); 
		}
	}
}

function isInArray(array, val)
{
	for(var j = 0; j < array.length; j++)
	{
		if(array[j] == val)
		{
			return true;
		}
	}
	return false;
}
	