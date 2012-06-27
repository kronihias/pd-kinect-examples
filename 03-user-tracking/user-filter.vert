varying vec3 normalVec; //Uebergabe zum Fragment Shader

void main() 
{
  normalVec = normalize(gl_NormalMatrix*gl_Normal);
  gl_Position = ftransform ();
}
