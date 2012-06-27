#extension GL_ARB_texture_rectangle : enable

// pix_openni user info is stored in B channel if usercoloring = 1 and depth_output = 2

uniform sampler2DRect DepthMap; // DEPTHMAP

void main (void)
{
	vec2 pos = (gl_TextureMatrix[0] * gl_TexCoord[0]).st;
	
	vec4 color = texture2DRect(DepthMap,  pos);

	if (color.b > 0.0)	// if bigger than zero a user is detected within this pixel
	{
		gl_FragColor =  color;
	} 
	else
	{
		gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
	}
}
