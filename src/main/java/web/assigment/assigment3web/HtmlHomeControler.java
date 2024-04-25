package web.assigment.assigment3web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HtmlHomeControler {
@GetMapping("/ticket/endre")
    public String endre_tt() {
    return "endre_ticket";
}
@GetMapping("/kino")
    public String welcome_tt() {
    return "index";
}
@GetMapping("/ticket/kjop")
    public String buy_tt() {
    return "billetter";
}
}
