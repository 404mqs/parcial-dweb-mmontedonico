$(document).ready(function() {
    
    // animacion del titulo
    $('#titulo-principal').hide().fadeIn(1500);

    // revisar si habia modo oscuro guardado
    if (localStorage.getItem('modoOscuro') === 'true') {
        $('body').addClass('modo-oscuro');
        $('#btn-modo').text('☀️');
    }

    // boton de modo oscuro - se mantiene entre paginas
    $('#btn-modo').click(function() {
        $('body').toggleClass('modo-oscuro');
        
        if ($('body').hasClass('modo-oscuro')) {
            $(this).text('☀️');
            localStorage.setItem('modoOscuro', 'true');
        } else {
            $(this).text('🌙');
            localStorage.setItem('modoOscuro', 'false');
        }
    });

    // boton limpiar formulario
    $('#btn-limpiar').click(function() {
        $('#form-contacto')[0].reset();
        $('.error-campo').text('');
    });

    // validacion formulario con mensajes individuales
    $('#form-contacto').submit(function(e) {
        e.preventDefault();
        
        // Limpiar mensajes de error previos
        $('.error-campo').text('');

        var nombre = $('#nombre').val().trim();
        var edad = $('#edad').val().trim();
        var email = $('#email').val().trim();
        var mensaje = $('#mensaje').val().trim();

        var hayError = false;

        // Validar nombre
        if (nombre === '') {
            $('#error-nombre').text('El nombre es obligatorio');
            hayError = true;
        }

        // Validar email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            $('#error-email').text('El email es obligatorio');
            hayError = true;
        } else if (!emailRegex.test(email)) {
            $('#error-email').text('El email no es válido');
            hayError = true;
        }

        // Validar edad
        if (edad === '') {
            $('#error-edad').text('La edad es obligatoria');
            hayError = true;
        } else if (!/^\d+$/.test(edad)) {
            $('#error-edad').text('La edad debe ser un número entero válido');
            hayError = true;
        } else {
            var edadNum = parseInt(edad, 10);
            if (edadNum < 1 || edadNum > 120) {
                $('#error-edad').text('La edad debe estar entre 1 y 120');
                hayError = true;
            }
        }

        // Validar mensaje
        if (mensaje === '') {
            $('#error-mensaje').text('El mensaje es obligatorio');
            hayError = true;
        } else if (mensaje.length < 10) {
            $('#error-mensaje').text('El mensaje debe tener al menos 10 caracteres');
            hayError = true;
        }

        // Si no hay errores, mostrar alerta de éxito
        if (!hayError) {
            alert('¡Mensaje enviado exitosamente!');
            $('#form-contacto')[0].reset();
        }
    });

});
