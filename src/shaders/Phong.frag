#version 330 core

in vec2 texCoord;
in vec4 worldPos;
in vec3 normal;

uniform sampler2D ourTexture;
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;
uniform float gloss;
uniform vec3 La;
uniform vec3 Ld;
uniform vec3 Ls;
uniform vec3 lightPos;
uniform vec3 cameraPos;

out vec4 fragColor;

void main()
{
	vec3 N = normalize(normal);
	vec3 L = normalize(lightPos - worldPos.xyz);
	vec3 R = normalize(2 * dot(L, N) * N - L);
	vec3 V = normalize(cameraPos - worldPos.xyz);

	fragColor = texture(ourTexture, texCoord);

	vec3 ambient = La * Ka * fragColor.rgb;
	vec3 diffuse = Ld * Kd * fragColor.rgb * max(dot(L, N), 0.0f);
	vec3 specular = Ls * Ks * pow(dot(V, R), gloss);

	fragColor = vec4(ambient + diffuse + specular, 1);
}