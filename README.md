## Listen - Azure Kinect Exploration

Our company [Listen](www.wearelisten.com) is sharing experiments using the latest Azure Kinect DK. The [Microsoft official site](https://www.microsoft.com/en-us/p/azure-kinect-dk/8pp5vxmd9nhq?activetab=pivot%3aoverviewtab) describes the features of the device some included in the table of contents. This R&D phase will produce the following: 

* Several demos that feature a wide range of the capabilities of the Azure Kinect device. See Table of contents. 
* Full documentation of the procedure, tools used, findings. 
* Exploration of creative possibilities of the device. 
* References to Third Party hardware and software that differs in functionality or could be combined with Azure Kinect. 

## Table of Contents  

1. [Audio Reactive VJ kit](#vjkit)
2. [Microsoft Azure Cognitive Services:](#services)
	* [Speech-to-Text](#speech)
	* [Computer Vision](#vision)
3. [Microphone Array](#micarray)
4. [Axis Sensors](#axissensors)


<a name="vjkit"></a>  

### Azure Kinect VJ Kit

This demo was made to test the feasibility of capturing 3D depth data with the Azure Kinect. We found that this device produces a much higher resolution 3D point cloud. A point cloud is a set of data points in space. Point clouds are generally produced by 3D scanners, which measure a large number of points on the external surfaces of objects around them.

#### Process

##### Step 1:  

Retrieving Raw 3D Depth: 

To do this we used openframeworks which is an open-source creative coding toolkit that allows developers the low level functionality of C++ but with the ease of using higher level pre-written code and plugins to get multimedia applications running quickly.

The open-source community released a plugin that utlizes the Azure Kinect SDK, specifically to retrieve and stream a point cloud. The below video documentation shows real-time generated 3D streaming data directly from the device. This gives us the ability to place physical environment, objects, people in 3D space i.e. translate, rotate, scale, manipulate 3D data. 

```c++

void ofApp::setup()
{
	//ofSetLogLevel(OF_LOG_VERBOSE);

	ofLogNotice(__FUNCTION__) << "Found " << ofxAzureKinect::Device::getInstalledCount() << " installed devices.";

	auto kinectSettings = ofxAzureKinect::DeviceSettings();
	kinectSettings.updateIr = false;
	kinectSettings.updateColor = true;
	kinectSettings.colorResolution = K4A_COLOR_RESOLUTION_1080P;
	kinectSettings.updateVbo = true;
	if (this->kinectDevice.open(kinectSettings))
	{
		this->kinectDevice.startCameras();
	}
}

void ofApp::draw()
{
	ofBackground(128);

	if (this->kinectDevice.isStreaming())
	{
		this->cam.begin();
		{
			ofDrawAxis(100.0f);

			if (this->kinectDevice.getColorInDepthTex().isAllocated())
			{
				this->kinectDevice.getColorInDepthTex().bind();
			}
			this->kinectDevice.getPointCloudVbo().draw(
				GL_POINTS,
				0, this->kinectDevice.getPointCloudVbo().getNumVertices());
			if (this->kinectDevice.getColorInDepthTex().isAllocated())
			{
				this->kinectDevice.getColorInDepthTex().unbind();
			}
		}
		this->cam.end();
	}

	ofDrawBitmapString(ofToString(ofGetFrameRate(), 2) + " FPS", 10, 20);
}


```
This small amount of code produces the following result. 

See below:

<iframe src="https://drive.google.com/file/d/1wJTxYD0P_6q-k_afNFIqYYmUpe_cQZpT/preview" width="640" height="480"></iframe>

##### Step 2:

Next we wanted to have the ability to stream the data into another heavily used creative coding software package [Touch Designer](https://www.derivative.ca/). Touch Designer is a collection of nodes that allows developers to see step by step how they are processing data. This makes it a great tool for exactly this purpose as we want to take raw depth data directly from the Azure Kinect --> stream it into Touch Designer --> apply post VFX to the depth point cloud.  

To transfer the 3D data into Touch Designer we used a software called [Spout](http://spout.zeal.co/) which streams a data into Touch Designer as a Texture. 

In this instance we grabbed the data and processed it to look almost like, what you would imagine, a 3D futuristic hologram. The combiniation of Raw depth data with our C++ code and the processing visual effects we apply using GLSL code in Touch Designer gives us the look we were going after. 

See below: 

<iframe src="https://drive.google.com/file/d/1PKLcK00VZMDmcA4wMplFmgWSVD8wcOVq/preview" width="640" height="480"></iframe>

##### Step 3: 

Since we now have Raw 3D Depth data --> Streaming into Touch Designer --> with GLSL post VFX on the 3D image we are able to apply any number of generative / interactive points to it. In this case we input a simple electronic drum track --> process that data --> finally have it directly effect the GLSL code values. 

See below: 

<iframe src="https://drive.google.com/file/d/1mBdy5fQGOHDl2aVKRk6SB1QycwHrVyPd/preview" width="640" height="480"></iframe>

Third Party Technology: 

[Depthkit](https://www.depthkit.tv/) is a software licensed package that allows for combining the RGB data, Depth data, and wrapping it up in a more universal 3d animation asset that can be used in game engines and creative coding toolkits. Currently, it only has the ability to use a single Azure Kinect but in the near future it will be able to captilize on the Azure Kinect "external device synchronization control with configurable delay offset between devices" feature where a developer can connect several devices to get a near, if not full, 360 degree volumetric capture of a person / object / room. 

<iframe title="vimeo-player" src="https://player.vimeo.com/video/344690092" width="640" height="480"></iframe>  

<a name="services"></a>
### Microsoft Azure Cognitive Services

The Azure Kinect enables the usage of the Azure Cognitive Vision services via the RGB camera and the Azure Speech Services via the microphone array. Below are descriptions of 

* A Speech-to-text demo that allows the user to speak naturally to produce sound playback. 
* A Computer Vision demo that allows the user to place objects on a table to produce sound playback of different instrumentaion.

<a name="speech"></a>
#### Speech to Text 

<a name="vision"></a>
#### Computer Vision 

##### Process

##### Step 1:  
Retrieving RGB data: 

The Azure Kinect has a built in 4k resolution RGB camera. Using the 
<iframe src="https://drive.google.com/file/d/1OdMt4V5yeW95UlQxs4vYJxOi0qhYjALf/preview" width="640" height="480"></iframe>

##### Step 2:
<iframe src="https://drive.google.com/file/d/1ZOdQOUl1PirJHDypdQACLbdgh0BZ6rHg/preview" width="640" height="480"></iframe>

##### Step 3:
<iframe src="https://drive.google.com/file/d/1S3X7bG79Jf6qZHQWpLpogI_c7RJXcKf4/preview" width="640" height="480"></iframe>


Interactive Sound Playback: 

Once the object is detected in the cameras view different sound files are triggered to playback the sequence. 

Apple = Kick
Banana = Snare / Hi-hats
Mug = Piano 
Orange = Synth

<iframe src="https://drive.google.com/file/d/12A6I5xCZBy40ci3nuBRVBY4WTL55Bi43/preview" width="640" height="480"></iframe>



Third Party Technology: 

[Coral](https://coral.withgoogle.com/): Allows for localized (non-cloud based), free usage of Tensorflow based real-time object detection libraries. The device is handheld that can be run offline. 

YOLO (You Only Look Once): is a real-time software package that is open-source and can run on a live video stream. 

<iframe width="640" height="480" src="https://www.youtube.com/embed/MPU2HistivI"></iframe> 

<a name="micarray"></a>
### Azure Kinect Microphone Array

<a name="axissensors"></a>
### Azure Kinect Axis Sensors

```c++ 

```

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

![Image](https://physicsworld.com/wp-content/uploads/2018/09/PWSep18Ball-noise_HERO-1024x576.jpg)
```


		



