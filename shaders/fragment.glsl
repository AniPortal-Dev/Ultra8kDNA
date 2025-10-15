// Minimaler Fragment Shader
varying vec3 vPosition;
void main() {
    gl_FragColor = vec4(abs(vPosition.xyz/10.0),1.0);
}
