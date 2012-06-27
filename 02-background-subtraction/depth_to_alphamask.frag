#extension GL_ARB_texture_rectangle : enable

uniform float xmin;
uniform float xmax;
uniform float ymin;
uniform float ymax;
uniform float zmin;
uniform float zmax;


uniform sampler2DRect DepthMap; // DEPTHMAP

void main (void)
{
	vec2 pos = (gl_TextureMatrix[0] * gl_TexCoord[0]).st;
	
	vec4 color = texture2DRect(DepthMap,  pos);

	vec3 real = vec3 (0.0, 0.0, 0.0);

	// COMPUTE REAL COORDINATES
	// in mm 
	
	// z component
	real.z = color.r * 65536.0 + color.g * 256.0; // depth_mode 4 or 5

	// x component
	float FovH = 1.0144686707507438;
	float XtoZ = tan(FovH / 2.0) * 2.0;
	real.x = ((pos.x / 640.0) - 0.5) * real.z * XtoZ;

	// y component
	float FovV=0.78980943449644714;
	float YtoZ = tan(FovV / 2.0) * 2.0;
	real.y = (0.5 - (pos.y / 480.0)) * real.z * YtoZ;

	// multiplicate depthmap with overlay image
	if ((real.x >= xmin) && (real.x <= xmax) && (real.y >= ymin) && (real.y <= ymax) && (real.z >= zmin) && (real.z <= zmax))
	{
		gl_FragColor =  vec4(1.0, 1.0, 1.0, 0.0);
	} 
	else
	{
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		//gl_FragColor = color;
	}

}
