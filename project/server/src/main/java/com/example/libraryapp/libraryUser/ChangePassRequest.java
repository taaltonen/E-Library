package com.example.libraryapp.libraryUser;

import lombok.*;

@Data
@EqualsAndHashCode
@Getter
@Setter
@ToString
@AllArgsConstructor
public class ChangePassRequest {
    private final Long userId;
    private final String password;
}
