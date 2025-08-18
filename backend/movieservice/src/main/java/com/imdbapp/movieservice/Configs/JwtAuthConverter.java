package com.imdbapp.movieservice.Configs;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;
import org.springframework.core.convert.converter.Converter;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = Stream.concat(
                jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
                extractRoles(jwt).stream()).collect(Collectors.toSet()
        );

        return new JwtAuthenticationToken(jwt, authorities);
    }

    public Collection<? extends GrantedAuthority> extractRoles(Jwt jwt) {
        Set<String> roles = new HashSet<>();

        //Extract roles form realm access
        Map<String,Object> realmAccess = jwt.getClaim("realm_access");
        if(realmAccess!=null && realmAccess.containsKey("roles")) {
            roles.addAll((Collection<? extends String>) realmAccess.get("roles"));
        }

        //Extract roles from resource access
        Map<String,Object> resourceAccess = jwt.getClaim("resource_access");
        if(resourceAccess!=null && resourceAccess.containsKey("demo")) {
            Map<String,Object> demoAccess = (Map<String, Object>) resourceAccess.get("demo");
            if(demoAccess!=null && demoAccess.containsKey("roles")) {
                roles.addAll((Collection<? extends String>) demoAccess.get("roles"));
            }
        }

        System.out.println("Extracted roles : " + roles);
        System.out.println("token : " + jwt.getTokenValue());

        return roles.stream().map(role -> "ROLE_" + role.toUpperCase())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());

    }
}
