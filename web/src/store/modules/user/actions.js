// Atualizar Perfil de Usuario
export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

// Atualização realizada com sucesso
export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

// Atualização de usuario falhou
export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
  };
}
