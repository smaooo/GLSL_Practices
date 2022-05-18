#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 vertical_wave(in vec2 st, in float frequency, in float depth) {
    
    vec2 uv = st *2.0 -1.0;
    vec3 color = vec3(step(uv.x,-sin(uv.y*frequency)*depth));

    return color;
}

vec3 straight_line(in vec2 st, in int direction) {

    vec2 uv = st * 2.0 - 1.0;
    vec3 color = vec3(0.0);
    if (direction == 0) {
        color = vec3(step(st.x,0.5));

    }
    else {
        color = vec3(step(st.y,0.5));
    } 

    return color;
}

vec3 circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
    vec3 color = vec3(1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0));
	return color;
}

vec3 circle_border(in vec2 st, in float radius, in float thickness) {
    return circle(st,radius) - circle(st,radius-thickness);
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // st.x += u_resolution.x/u_resolution.y;

    gl_FragColor = vec4(circle_border(st,0.5,0.1),1.0);
}



