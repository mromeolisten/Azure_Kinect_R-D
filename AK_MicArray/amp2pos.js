inlets = 1;
outlets = 2;
var _num_peaks_to_find = 3;
var _num_mics = 7;

function getCoordinates()
{
	var amp_array = arrayfromargs(arguments);
	//get the index of the three loudest peaks
	var loudest_peaks = [];
	for(var i = 0; i < _num_peaks_to_find; i++)
	{
		loudest_peaks.push( indexOfMax(amp_array,loudest_peaks) );
	}
	outlet(0,loudest_peaks);
}

function indexOfMax(arr, loudest_peaks) {
    if (arr.length === 0) {
        return -1;
    }

    var max = 0;
    var maxIndex = 0;
    var index = 0;

    if(loudest_peaks.length != 0)
    {
    	var flag = true;

    	while(index < _num_mics && flag)
    	{
    		if(isInArray(loudest_peaks, index))
    		{
    			index++;
    		}
    		else
    		{
    			max = arr[index];
    			maxIndex = index;
    			flag = false;
    		}
    	}
    }
    
	for (var i = index + 1; i < arr.length; i++) {
        if (arr[i] > max && !isInArray(loudest_peaks,i)) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function calculateVectors()
{
	var amp_array = arrayfromargs(arguments);
	var vectors = [];
	var v = []

	for(var i = 0; i <_num_mics; i++)
	{
		if(i == 0)
		{
			//shooting up in z
			v = [0,0,amp_array[i]];
		}
		else if(i == 1)
		{
			v = [0, amp_array[i], 0 ];
		}
		else if(i == 2)
		{
			v = [amp_array[i]*Math.cos(30), amp_array[i]*Math.sin(30), 0 ];
		}
		else if(i == 3)
		{
			v = [amp_array[i]*Math.cos(30), -1*amp_array[i]*Math.sin(30), 0 ];
		}
		else if(i == 4)
		{
			v = [0,-1*amp_array[i],0];
		}
		else if(i == 5)
		{
			v = [-1*amp_array[i]*Math.cos(30), -1*amp_array[i]*Math.sin(30), 0 ];
		}
		else if(i == 6)
		{
			v = [-1*amp_array[i]*Math.cos(30), amp_array[i]*Math.sin(30), 0 ];
		}
		vectors.push(v);
	}
	//calculate the sum of all vectors
	v = [0, 0, 0];
	for(var i = 0; i <_num_mics; i++)
	{
		v[0] +=  vectors[i][0];
		v[1] +=  vectors[i][1];
		v[2] +=  vectors[i][2];
	}
	//v = normalizeVector(v);
	outlet(0, "vector", v);
}

function isInArray(arr, val)
{
	if (arr.length === 0) {
        return false;
    }

    for(var i = 0; i < arr.length; i++)
    {
    	if(arr[i] == val)
    	{
    		return true;
    	}
    }
    return false;
}

function normalizeVector(v)
{
	var dis = Math.sqrt( (v[0] * v[0]) + (v[1] * v[1]) + (v[2] * v[2]) );
	v[0] = v[0]/dis;
	v[1] = v[1]/dis;
	v[2] = v[2]/dis;

	return v;
}

function sortArray()
{
	var temp = arrayfromargs(arguments);
	var amp_array = [];
	var mic_data = [];
	
	for(var i = 0; i< temp.length; i=i+3)
	{
		mic_data = [temp[i], temp[i+1], temp[i+2]];
		amp_array.push(mic_data);
	}
	
	amp_array = bubbleSort(amp_array);
	
	for(var k = 0; k < amp_array.length; k++)
	{
		if(k < 3)
		{
			outlet(0, "sorted", amp_array[k][1], amp_array[k][0], amp_array[k][2]);
		}
		
	}
	
	

} 
//0 3.326127 938.666667 1 2.973886 0. 2 2.560035 0. 3 2.963035 0. 4 4.086947 0. 5 3.90085 0. 6 3.167768 0.

function bubbleSort(arr){
        var len = arr.length;
        for (var i = len-1; i>=0; i--)
        {
                for(var j = 1; j<=i; j++)
                {
                        if(arr[j-1][0]>arr[j][0])
                        {
                        var temp = arr[j-1];
                        arr[j-1] = arr[j];
                        arr[j] = temp;
                }
                }
   }
   return arr;
}