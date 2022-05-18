#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

#define TWO_PI 6.28318530718

vec3 color1 = vec3(1.0,0.0,0.0);
vec3 color2 = vec3(1.0, 165.0/255.0, 0.0);
vec3 color3 = vec3(1.0,1.0,0.0);
vec3 color4 = vec3(0.0,128.0/255.0,0.0);
vec3 color5 = vec3(0.0,.0,1.0);
vec3 color6 = vec3(75.0/255.0,0.0,130.0/255.0);
vec3 color7 = vec3(238.0/255.0,130.0/255.0,238.0/255.0);

vec3 hsv2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

	return c.z * mix( vec3(1.0), rgb, c.y);
}
float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 rectangle(in vec2 st, in float padding, in int s) {
    vec2 bl = smoothstep(vec2(0.0),vec2(padding),st);
    vec2 tr = smoothstep(vec2(0.0),vec2(padding), 1.0-st);
    vec3 color = vec3(bl.x*bl.y*tr.x*tr.y);
    if (s == 1) {
        return color;

    }
    else {
        return vec3(floor(color.x),floor(color.y), floor(color.z));

    }
}

vec3 custom_rectangle(in vec2 st, in vec4 position) {
    vec3 res = vec3(0.0);
    float left = step(position.x,st.x);
    float right = step(st.x,position.y);
    float top = step(st.y,position.z);
    float bottom = step(position.w,st.y);
    res = vec3(left*right*top*bottom);
    return res;
}

vec3 border(in vec2 st, in float size) {
    return 1.0-rectangle(st,size,0);
}

vec3 custom_shape(in vec2 st, in float t, in vec2 r, in vec4 pos) {
    
    
    vec3 c;
	float l,z=t;
	for(int i=0;i<3;i++) {
		vec2 uv,p=st;
        p.x = smoothstep(pos.x,pos.y,st.x);
        p.y = smoothstep(pos.z,pos.w,st.y);
		uv=p;
		p-=.5;
		p.x*=r.x/r.y;
		z+=.07;
		l=length(p);
		uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z-z));
		c[i]=.01/length(mod(uv,1.)-.5);
	}

    return c/l;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);
    vec2 bl = floor(smoothstep(vec2(0.0),vec2(0.1),st));
    float pct = bl.x * bl.y;
    vec2 tr = floor(smoothstep(vec2(0.0),vec2(0.1),1.0-st));
    pct *= tr.x * tr.y;
    color = vec3(pct);

    vec3 red = vec3(157.0/255.0,30.0/255.0,33.0/255.0);
    vec3 white = vec3(241.0/255.0,234.0/255.0,217.0/255.0);
    vec3 yellow = vec3(251.0/255.0,196.0/255.0,36.0/255.0);
    vec3 blue = vec3(0.0,94.0/255.0,154.0/255.0);
    color = custom_rectangle(st,vec4(0.0,0.08,1.0,0.8))*red; 
    color += custom_rectangle(st,vec4(0.1,0.25,1.0,0.8)) * red;
    color += custom_rectangle(st,vec4(0.27,0.8,1.0,0.8)) * white;
    color += custom_rectangle(st,vec4(0.82,0.95,1.0,0.8)) * white;
    color += custom_rectangle(st,vec4(0.97,1.0,1.0,0.8)) * yellow;

    color += custom_rectangle(st,vec4(0.0,0.08,0.78,0.58))*red; 
    color += custom_rectangle(st,vec4(0.1,0.25,0.78,0.58)) * red;
    color += custom_rectangle(st,vec4(0.27,0.8,0.78,0.58)) * white;
    color += custom_rectangle(st,vec4(0.82,0.95,0.78,0.58)) * white;
    color += custom_rectangle(st,vec4(0.97,1.0,0.78,0.58)) * yellow;

    color += custom_rectangle(st,vec4(0.0,0.25,0.56,0.0)) * white;
    color += custom_rectangle(st,vec4(0.27,0.8,0.56,0.1)) * 
    mix(white,mix(blue,mix(red,yellow,sin(u_time)),sin(u_time)),sin(u_time))
    * custom_shape(st,u_time,u_resolution,vec4(0.27,0.8,0.56,0.1));
    color += custom_rectangle(st,vec4(0.82,0.95,0.56,0.1)) * white;
    color += custom_rectangle(st,vec4(0.97,1.0,0.56,0.1)) * white;
    color += custom_rectangle(st,vec4(0.27,0.8,0.08,0.0)) * white;
    color += custom_rectangle(st,vec4(0.82,0.95,0.08,0.0)) * blue;
    color += custom_rectangle(st,vec4(0.97,1.0,0.08,0.0)) * blue;
    color = mix(color,vec3(rand(st)),vec3(0.1));
    gl_FragColor = vec4(color,1.0);
        
}

