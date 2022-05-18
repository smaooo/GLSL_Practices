
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

int i = 0;
void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 center = vec2(0.5);
    vec3 cs[4];
    cs[0] = vec3(1.0,0.0,0.0);
    cs[1] = vec3(0.0,1.0,0.0);
    cs[2] = vec3(0.0,0.0,1.0);
    cs[3] = vec3(1.0,1.0,0.0);
    
    vec3 c = vec3(0.0);
    float pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));




    vec3 color = vec3(pct);
    float size = abs(sin(u_time*2.0)/3.0);
    size = 0.4;
    color = smoothstep(size -0.06,size,color);
    gl_FragColor = vec4(vec3(circle(st,0.1)),1.0);
}