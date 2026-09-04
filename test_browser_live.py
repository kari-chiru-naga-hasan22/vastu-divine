import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

ALL_20_TOOL_IDS = [
    'house-vastu-analyzer',
    'plot-vastu-analyzer',
    'main-door-vastu',
    'house-facing-calculator',
    'bedroom-vastu',
    'kitchen-vastu',
    'toilet-bathroom-vastu',
    'puja-room-vastu',
    'water-vastu',
    'staircase-vastu',
    'name-number',
    'name-analysis',
    'life-path',
    'birth-number',
    'destiny-number',
    'lucky-number',
    'mobile-number',
    'vehicle-number',
    'business-name',
    'name-dob-compatibility'
]

def main():
    errors = []
    warnings = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()

        page.on("console", lambda msg: (
            errors.append(f"CONSOLE {msg.type.upper()}: {msg.text}") if msg.type in ['error'] 
            else warnings.append(f"CONSOLE {msg.type}: {msg.text}") if 'error' in msg.text.lower() or 'warn' in msg.type.lower() or 'polygon' in msg.text.lower()
            else None
        ))
        page.on("pageerror", lambda exc: errors.append(f"PAGEERROR: {str(exc)}"))

        print("Navigating to http://localhost:8080/index.html ...")
        page.goto("http://localhost:8080/index.html", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # 1. Check sketchbook root element
        sb_el = page.query_selector("#sketchbook-tools")
        print("Sketchbook element present:", sb_el is not None)

        # Check all 20 tools in the sketchbook or grid
        # In index.html, openToolDirectly is called by buttons
        # Let's test calling openToolDirectly for all 20 tools, filling inputs, and submitting form!
        passed_tools = []
        failed_tools = []

        for tid in ALL_20_TOOL_IDS:
            print(f"\n--- Testing Tool Modal & Execution: {tid} ---")
            try:
                # Open tool
                page.evaluate(f"window.openToolDirectly('{tid}')")
                page.wait_for_timeout(200)

                modal = page.query_selector("#tool-modal")
                is_active = page.evaluate("document.getElementById('tool-modal').classList.contains('active')")
                if not is_active:
                    raise Exception(f"Modal did not open for {tid}")

                # Verify form fields container is populated
                form_fields = page.query_selector("#modal-form-fields")
                html = form_fields.inner_html().strip()
                if not html:
                    raise Exception(f"Form fields empty for {tid}")

                # Trigger submit
                page.evaluate("document.getElementById('tool-form').dispatchEvent(new Event('submit', { cancelable: true }))")
                page.wait_for_timeout(300)

                # Check result card
                card_visible = page.evaluate("document.getElementById('modal-result-card').classList.contains('visible')")
                if not card_visible:
                    raise Exception(f"Result card not visible after submit for {tid}")

                el_name = page.evaluate("document.getElementById('res-element-name').textContent").strip()
                assess = page.evaluate("document.getElementById('res-assessment-text').textContent").strip()
                src = page.evaluate("document.getElementById('res-source-ref').textContent").strip()
                rule = page.evaluate("document.getElementById('res-plain-rule').textContent").strip()
                disc = page.evaluate("document.getElementById('res-disclaimer').textContent").strip()

                print(f"  [OK] Result Card: Element='{el_name[:30]}', Assessment='{assess[:40]}...'")
                if not el_name or not assess or not src or not rule:
                    raise Exception(f"Incomplete result card fields for {tid}: name='{el_name}', assess='{assess}', src='{src}', rule='{rule}'")

                # Close modal
                page.evaluate("closeModal()")
                page.wait_for_timeout(100)

                passed_tools.append(tid)
            except Exception as e:
                print(f"  [FAIL] {tid}: {e}")
                failed_tools.append((tid, str(e)))

        print("\n=======================================================")
        print(f"TOOL MODAL TEST: {len(passed_tools)}/20 PASSED, {len(failed_tools)} FAILED")
        print("=======================================================")

        if errors:
            print("\nERRORS DETECTED:")
            for err in errors:
                print(" ", err)
        else:
            print("\nZERO BROWSER CONSOLE ERRORS DETECTED!")

        if warnings:
            print("\nWARNINGS DETECTED:")
            for w in warnings:
                print(" ", w)

        browser.close()

if __name__ == "__main__":
    main()
