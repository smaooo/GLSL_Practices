#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;

vec3 polygon(in vec2 st, in vec2 position, in float size, in int num_sides) {
    vec3 color = vec3(0.0);

    vec2 uv = st;
    uv.x *= u_resolution.x/u_resolution.y;

    uv.x = uv.x * 2.0 - position.x;
    uv.y = uv.y * 2.0 - position.y;
    float angle = atan(uv.x,uv.y)+PI;
    float radius = TWO_PI/float(num_sides);
    float dist = cos(floor(.5+angle/radius)*radius-angle)*length(uv);;
    color = vec3(1.0-smoothstep(size,size+0.01,dist));
    return color;
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    gl_FragColor = vec4(polygon(st,vec2(1.0),0.5,4)*vec3(1.0,0.0,0.0),1.0);

}