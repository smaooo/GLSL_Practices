#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;


float gridWidth = 1.7;
float scale = 0.0013;
float zoom = 10.0;
vec2 offset = vec2(0.5);

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01*zoom, pct, st.y) -
          smoothstep( pct, pct+0.01*zoom, st.y);
}
vec3 grid2D( in vec2 _st, in float _width ) {
    float axisDetail = _width*scale;
    if (abs(_st.x)<axisDetail || abs(_st.y)<axisDetail) 
        return 1.0-vec3(0.65,0.65,1.0);
    if (abs(mod(_st.x,1.0))<axisDetail || abs(mod(_st.y,1.0))<axisDetail) 
        return 1.0-vec3(0.80,0.80,1.0);
    if (abs(mod(_st.x,0.25))<axisDetail || abs(mod(_st.y,0.25))<axisDetail) 
        return 1.0-vec3(0.95,0.95,1.0);
    return vec3(0.0);
}
void main() {
	vec2 st = (gl_FragCoord.xy/u_resolution.xy)-offset;
    st.x *= u_resolution.x/u_resolution.y;
	// st.y +=0.5;
	scale *= zoom;
    st *= zoom;

	vec2 ms = u_mouse/u_resolution;
	float y =  fract(sin(1.0 - pow(abs(st.x+100.0),2.0)+u_time*10.0)*1.0);
	vec3 color = vec3(y);
	float pct = plot(st,y);
	color = grid2D(st,2.0);

	color += pct*vec3(1.0, 0.0, 0.0);
	
	gl_FragColor = vec4(color,1.0);
}
