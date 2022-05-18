#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec3 vertical_wave(in vec2 st, in float frequency, in float depth) {
    
    vec2 uv = st *2.0 -1.0;
    vec3 color = vec3(step(uv.x,-sin(uv.y*frequency)*depth));

    return color;
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // st.x += u_resolution.x/u_resolution.y;

    gl_FragColor = vec4(vertical_wave(st,3.0,0.9),1.0);
}



