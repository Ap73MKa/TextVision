#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;
use window_shadows::set_shadow;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            #[cfg(any(windows, target_os = "macos"))]
            set_shadow(&window, true).unwrap();
            Ok(())
        })
        .run(context)
        .expect("error while running tauri application");
}